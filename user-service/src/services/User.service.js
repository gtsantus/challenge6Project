import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserService {
    signUp = async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (user) {
            throw new Error("That User already exists");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            password: hashedPassword,
            admin: false,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });

        return { accessToken: token, id: newUser._id, admin: newUser.admin }
    }

    login = async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("Invalid username");
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (passwordMatches) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 86400,
            });
            return { accessToken: token, id: user._id, admin: user.admin };
        } else {
            throw new Error("Invalid password");
        };
    }

    addDeck = async ({ id, name, cards, faction }) => {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        } else if (user.decks.find(deck => deck.name === name)) {
            throw new Error("That Deck already exists");
        }
        user.decks.push({ name: name, faction: faction, cards: cards });
        await user.save();
        return user.decks;
    }

    updateDeck = async ({ id, name, cards }) => {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        const deck = user.decks.find(deck => deck.name === name);
        if (!deck) {
            throw new Error("Deck not found");
        }
        deck.cards = cards;
        await user.save();
        return user.decks;
    }

    getDecks = async (id) => {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }else if (user.decks.length === 0) {
            throw new Error("No decks found");
        }
        return user.decks;
    }

    deleteDeck = async ( id, deckId ) => {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        const deck = user.decks.find(deck => deck._id == deckId);
        if (!deck) {
            throw new Error("Deck not found");
        }
        user.decks = user.decks.filter(deck => deck._id != deckId);
        await user.save();
        return user.decks;
    }
}