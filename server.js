const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const PDFDocument = require('pdfkit');  // For PDF invoice generation
const { parse } = require('json2csv');  // For CSV invoice generation

const app = express();
const port = 3000;

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// In-memory queue for bill payment requests
let paymentQueue = [];

// Stack to track historical transactions (for undo functionality)
let transactionStack = [];

// Invoice folder path
const invoiceFolder = path.join(__dirname, 'invoice');

// Ensure the invoice folder exists
if (!fs.existsSync(invoiceFolder)) {
    fs.mkdirSync(invoiceFolder);
}

// Helper function to generate PDF invoice
function generateInvoicePDF(payment) {
    const doc = new PDFDocument();
    const invoicePath = path.join(invoiceFolder, `invoice_${payment.paymentId}.pdf`);

    doc.pipe(fs.createWriteStream(invoicePath));
    
    // Add content to the PDF invoice
    doc.text(`Invoice for Payment ID: ${payment.paymentId}`, { align: 'center' });
    doc.text(`Bill Type: ${payment.billType}`);
    doc.text(`Amount: ${payment.amount}`);
    doc.text(`Account Number: ${payment.accountNumber}`);
    doc.text(`Payment Date: ${payment.paymentDate}`);
    doc.text(`Status: ${payment.status}`);
    doc.end();
    
    console.log(`Invoice saved as PDF at ${invoicePath}`);
}

// Helper function to generate CSV invoice
function generateInvoiceCSV(payment) {
    const csvData = [
        {
            PaymentID: payment.paymentId,
            BillType: payment.billType,
            Amount: payment.amount,
            AccountNumber: payment.accountNumber,
            PaymentDate: payment.paymentDate,
            Status: payment.status
        }
    ];

    const csvFilePath = path.join(invoiceFolder, `invoice_${payment.paymentId}.csv`);
    
    const csvWriter = createObjectCsvWriter({
        path: csvFilePath,
        header: [
            { id: 'PaymentID', title: 'Payment ID' },
            { id: 'BillType', title: 'Bill Type' },
            { id: 'Amount', title: 'Amount' },
            { id: 'AccountNumber', title: 'Account Number' },
            { id: 'PaymentDate', title: 'Payment Date' },
            { id: 'Status', title: 'Status' }
        ],
        append: false
    });

    csvWriter.writeRecords(csvData)
        .then(() => {
            console.log(`Invoice saved as CSV at ${csvFilePath}`);
        })
        .catch((err) => {
            console.error('Error saving CSV:', err);
        });
}

// Route for testing the server (GET /)
app.get('/', (req, res) => {
    res.send('Server is running! Use POST /payment to make a payment.');
});

// Route to handle bill payment (POST /payment)
app.post('/payment', (req, res) => {
    const { billType, amount, accountNumber, paymentDate } = req.body;

    // Validate required fields
    if (!billType || !amount || !accountNumber || !paymentDate) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create payment object
    const payment = {
        billType,
        amount,
        accountNumber,
        paymentDate,
        status: 'Completed',
        paymentId: paymentQueue.length + 1,  // Unique payment ID
    };

    // Add payment to the queue (simulating processing)
    paymentQueue.push(payment);

    // Add the payment to transaction stack for undo functionality
    transactionStack.push(payment);

    // Generate the invoice and save it to the invoice folder (both PDF and CSV)
    generateInvoicePDF(payment);
    generateInvoiceCSV(payment);

    // Respond with success message
    res.json({ message: 'Payment processed successfully.', payment });
});

// Route to retrieve all payments (GET /payments)
app.get('/payments', (req, res) => {
    res.json({ payments: paymentQueue });
});

// Route to undo the last payment (POST /undo)
app.post('/undo', (req, res) => {
    if (transactionStack.length === 0) {
        return res.status(400).json({ error: 'No transactions to undo.' });
    }

    const lastPayment = transactionStack.pop();
    paymentQueue = paymentQueue.filter(payment => payment.paymentId !== lastPayment.paymentId);

    res.json({ message: 'Last payment undone.', lastPayment });
});

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
