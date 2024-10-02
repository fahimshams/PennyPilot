// models/Address.js

class Address {
    // Private properties
    #street;
    #city;
    #state;
    #zipCode;
    #country;

    // Setters
    set street(value) {
        this.#street = value;
    }

    set city(value) {
        this.#city = value;
    }

    set state(value) {
        this.#state = value;
    }

    set zipCode(value) {
        this.#zipCode = value;
    }

    set country(value) {
        this.#country = value;
    }

    // Getters
    get street() {
        return this.#street;
    }

    get city() {
        return this.#city;
    }

    get state() {
        return this.#state;
    }

    get zipCode() {
        return this.#zipCode;
    }

    get country() {
        return this.#country;
    }

    // Method to validate the address
    isValid() {
        // All fields are optional, so we only need to check if they are valid if they are provided
        const isStreetValid = !this.#street || typeof this.#street === 'string';
        const isCityValid = !this.#city || typeof this.#city === 'string';
        const isStateValid = !this.#state || typeof this.#state === 'string';
        const isZipCodeValid = !this.#zipCode || typeof this.#zipCode === 'string';
        const isCountryValid = !this.#country || typeof this.#country === 'string';

        return isStreetValid && isCityValid && isStateValid && isZipCodeValid && isCountryValid;
    }

    // Method to return the address as an object
    toObject() {
        return {
            street: this.#street,
            city: this.#city,
            state: this.#state,
            zipCode: this.#zipCode,
            country: this.#country,
        };
    }

    getFullAddress(){

        const address = [];

        if (this.#street) address.push(this.#street);
        if (this.#city) address.push(this.#city);
        if (this.#state) address.push(this.#state);
        if (this.#zipCode) address.push(this.#zipCode);
        if (this.#country) address.push(this.#country);

        return address.join(',');

    }
}

module.exports = Address;
