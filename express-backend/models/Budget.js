// models/Budget.js

class Budget {
    // Private properties
    #amount; // Integer part
    #cents;  // Fractional part

    // Setters
    set amount(value) {
        if (typeof value === 'number' && value >= 0) {
            this.#amount = value;
        } else {
            throw new Error('Amount must be a non-negative number');
        }
    }

    set cents(value) {
        if (typeof value === 'number' && value >= 0 && value < 100) {
            this.#cents = value;
        } else {
            throw new Error('Cents must be a number between 0 and 99');
        }
    }

    // Getters
    get amount() {
        return this.#amount;
    }

    get cents() {
        return this.#cents;
    }

    // Method to validate the budget
    isValid() {
        const isAmountValid = this.#amount === undefined || (typeof this.#amount === 'number' && this.#amount >= 0);
        const isCentsValid = this.#cents === undefined || (typeof this.#cents === 'number' && this.#cents >= 0 && this.#cents < 100);
        
        return isAmountValid && isCentsValid;
    }

    // Method to return the budget as an object
    toObject() {
        return {
            amount: this.#amount,
            cents: this.#cents,
        };
    }

    // Method to return the full budget as a decimal string
    getFullBudget() {
        const parts = [];

        if (this.#amount !== undefined) parts.push(this.#amount);
        if (this.#cents !== undefined) parts.push(this.#cents.toString().padStart(2, '0')); // Pad cents with leading zero if necessary

        return parts.join('.'); // Join amount and cents
    }
}

module.exports = Budget;
