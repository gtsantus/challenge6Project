import mongoose from "mongoose";

export default class Database {
    #connectionAttempts = 0;
    #uri;
    #maxAttempts = 10;
    #retryDelay = 1000;

    constructor(uri) {
        this.#uri = uri;
    }

    connect = async () => {
        while (this.#connectionAttempts < this.#maxAttempts) {
            this.#connectionAttempts++;
            try {
                await mongoose.connect(this.#uri);
                return console.log("Database connection to " + mongoose.connection.db.databaseName + " was successful");
            } catch (e) {
                console.log("Connection Error, attempt " + this.#connectionAttempts + ": ", e)
                if (this.#connectionAttempts >= this.#maxAttempts) {
                    console.log(`Database unavailable after ${this.#maxAttempts} attempts`);
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, this.#retryDelay));
            }
        }
    };

    close = async () => {
        try {
            await mongoose.disconnect();
            console.log("Database closed");
        } catch (e) {
            console.log("Error closing the database", e);
        }
    };
}

