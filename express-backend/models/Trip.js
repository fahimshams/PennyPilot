
const Address = requires('./Address')
const Budget = requires('./Budget')

class Trip{
    #addressFrom
    #addressTo
    #budget
    #startingDate
    #endingDate



    set addressFrom(value) {

        this.#addressFrom = new Address();
        this.#addressFrom.street = value.street
   
        this.#addressFrom.city = value.city;
        this.#addressFrom.state = value.state;
        this.#addressFrom.zipCode = value.zipCode;
        this.#addressFrom.country = value.country;
       
    }

    set addressTo(value) {
        this.#addressTo = new Address();
        this.#addressTo.street = value.street
        this.#addressTo.city = value.city;
        this.#addressTo.state = value.state;
        this.#addressTo.zipCode = value.zipCode;
        this.#addressTo.country = value.country;
    }

    set budget(value) {
        this.#budget = new Budget();
        this.#budget.amount = value.amount;
        this.#budget.cents = value.cents;

    }

    set startingDate(value) {
        this.#startingDate = new Date(value);
    }

    set endingDate(value) {
        this.#endingDate = new Date(value);
    }

    // Getters
    get addressFrom() {
        return this.#addressFrom.toObject(); // Return as an object
    }

    get addressTo() {
        return this.#addressTo.toObject(); // Return as an object
    }

    get budget() {
        return this.#budget.toObject(); // Return as an object
    }

    get budgetAsDecimal() {
        return this.#budget.getFullBudget(); // Get the full budget as a decimal string
    }

    get startingDate() {
        return this.#startingDate;
    }

    get endingDate() {
        return this.#endingDate;
    }

    // Method to validate the trip
    isValid() {
        const isValidBudget = this.#budget.isValid();
        const isValidDates = this.#startingDate instanceof Date && !isNaN(this.#startingDate) &&
                             this.#endingDate instanceof Date && !isNaN(this.#endingDate) &&
                             this.#startingDate < this.#endingDate; // Check if startingDate is before endingDate

        return this.#addressFrom.isValid() && this.#addressTo.isValid() && isValidBudget && isValidDates;
    }

    // Method to return the trip as an object
    toObject() {
        return {
            addressFrom: this.#addressFrom.toObject(),
            addressTo: this.#addressTo.toObject(),
            budget: this.#budget.toObject(),
            budgetAsDecimal: this.budgetAsDecimal, // Add the budget as a decimal string
            startingDate: this.#startingDate.toISOString(),
            endingDate: this.#endingDate.toISOString(),
        };
    }
}

module.exports = Trip;