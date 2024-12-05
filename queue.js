class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    front() {
        return this.isEmpty() ? null : this.items[0];
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.items.push(element);
        } else {
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (element.status === 'Priority' && this.items[i].status !== 'Priority') {
                    this.items.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) this.items.push(element);
        }
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    front() {
        return this.isEmpty() ? null : this.items[0];
    }
}

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        return this.isEmpty() ? null : this.items[this.items.length - 1];
    }
}

module.exports = { Queue, PriorityQueue, Stack };
