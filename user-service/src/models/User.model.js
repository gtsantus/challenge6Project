import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    decks: [{
        name: { type: String, required: true },
        cards: [{
            name: { type: String, required: true },
            power: { type: String, required: true },
            toughness: { type: String, required: true },
            faction: { type: String, required: true }
        }]
    }]
});

const User = mongoose.model(`User`, userSchema);

export default User;