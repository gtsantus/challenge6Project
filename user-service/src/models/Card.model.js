import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Commander', 'Minion', 'Spell', 'Camp', 'Token'], required: true  },
    cost: { type: String, required: true},
    faction: { type: String, enum: ['Tech', 'Undead', 'Order', 'Druid', 'Guerilla', 'Wizard'], required: true },
    power: { type: String},
    toughness: { type: String},
    rows: [{ type: String, enum: ['Front', 'Middle', 'Back'], required: true }],
    cardText: { type: String },
    flavorText: { type: String },
    legendary: { type: Boolean, required: true, default: false},
});

const Card = mongoose.model(`Card`, cardSchema);

export default Card;