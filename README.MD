# Public Utility Bill Payment System

The **Public Utility Bill Payment and Invoice Generation System** helps users manage and pay their utility bills for **electricity**, **water**, and **gas** efficiently. The system allows users to log payments, generate invoices, and track historical transactions, ensuring that urgent requests (e.g., overdue payments, disconnections) are prioritized and handled effectively.

## Features
- **Add Payment:** Log new utility bill payments with details such as bill type, amount, and account number.
- **Undo Payment:** Undo the last payment if there was an error or incorrect entry.
- **Retrieve Payments:** Retrieve a summary of all payments or filter by type, amount, or date range.
- **Generate Invoice:** Automatically generate invoices in **PDF** or **CSV** format after each payment.
- **Transaction History:** Track historical transactions and view previous payments.
- **Overdue Payments:** Automatically log overdue payments for auditing and follow-up.
- **Priority Handling:** Prioritize urgent requests like disconnections or reconnections.

## Tech Stack
- **Node.js:** JavaScript runtime for building the backend API.
- **Express:** Web framework for handling HTTP requests.
- **uuid:** Used for generating unique payment IDs.
- **pdfkit:** For generating PDF invoices.
- **csv-writer:** For generating CSV invoices and storing transaction records.
- **node-cron:** Scheduling library for automated tasks like logging overdue payments.
- **In-memory Array Storage:** Stores expense data temporarily for simplicity.
- **fs (File System):** For reading/writing to files such as invoices and transaction logs.

## Installation

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/evitabarboza/utility-bill-payment.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd utility-bill-payment
   ```

3. **Install dependencies:**
   ```bash
   npm init -y
   npm install express fs pdfkit
   ```

4. **Start the application:**
   ```bash
   node server.js
   ```
   The app will run locally on `http://localhost:3000`.

## Usage

### Adding a Payment
Send a **POST** request to `/payment` with the following JSON body:

```json
{
  "billType": "Electricity",      
  "amount": 500,                 
  "accountNumber": "12345",      
  "paymentDate": "2024-12-05"    
}
```

### Retrieving Payments
Send a **GET** request to `/payments?category=Electricity&startDate=2024-12-01&endDate=2024-12-05` to get filtered payments by category or date range.

### Undoing the Last Payment
Send a **POST** request to `/undo` to undo the most recent payment.

### Generating Invoices
The system automatically generates invoices after each payment. These invoices are stored in the `invoices/` folder in **PDF** or **CSV** format.

### Automated Summary Reports
The system uses a **cron job** to generate automated daily reports for all transactions. These reports can be used for auditing and accounting purposes.

## Project Structure
```
utility-bill-payment/
├── invoices/          # Directory for storing PDF invoices
├── payments.csv       # CSV file for storing payment records
├── transaction_log.json # JSON file for logging transactions
├── server.js          # Main server code
├── package.json       # Node.js dependencies and configurations
└── README.md          # Project documentation
```

### /src
- **server.js**: Main file handling server routes and logic.
- **payment.js**: Logic for managing payments (add, retrieve, undo, generate invoices).
- **cron.js**: Handles automated summary reports and overdue payment logging.

## Dependencies
- **express**: Web framework for building APIs.
- **uuid**: Used for generating unique IDs for payments.
- **node-cron**: For automating daily summary reports.
- **pdfkit**: For generating invoices in PDF format.
- **csv-writer**: For generating CSV files to store payment records.
- **fs (File System)**: For file reading and writing.
- **path**: To handle file paths.

## License

This project is licensed under the MIT License. You can find a copy of the license [here](LICENSE).

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature-branch
   ```
3. **Make your changes and commit them:**
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature-branch
   ```
5. **Open a pull request.**

Please make sure to update tests as appropriate.

## Contact

For any inquiries, suggestions, or feedback, please contact me at:

- **Email:** evitabarboza195@gmail.com
- **GitHub:** [Evita Barboza](https://github.com/evitabarboza)

---
