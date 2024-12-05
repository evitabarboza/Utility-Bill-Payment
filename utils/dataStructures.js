// Queue Implementation (FIFO)
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return this.items;
    }

    find(predicate) {
        return this.items.find(predicate);
    }
}

// PriorityQueue Implementation (Priority based, can be adjusted)
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        const queueElement = { item, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift().item;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return this.items.map((element) => element.item);
    }

    find(predicate) {
        const element = this.items.find((el) => predicate(el.item));
        return element ? element.item : null;
    }
}

// Stack Implementation (LIFO)
class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        return this.isEmpty() ? null : this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return this.items;
    }
}

module.exports = {
    Queue,
    PriorityQueue,
    Stack,
};
