import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card',
            required: true
        }
    ],
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    decks: [
        {
            type: deckSchema,
            required: true
        }
    ],
    admin: { type: Boolean, required: true, default: false},
});



const User = mongoose.model(`User`, userSchema);

export default User;