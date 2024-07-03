import UserService from "../services/User.service.js";

export default class UserController {
    #service

    constructor(service = new UserService()) {
        this.#service = service;
    }

    signUp = async (req, res) => {
        try {
            const user = await this.#service.signUp(req.body);
            res.header("X-Access-Token", user.accessToken).status(200).json(user);
        } catch (e) {
            if(e.message === "That User already exists") {
                console.log("ERROR: ", e.message || e);
                res.status(409).json({ message: e.message });
                return;
            } else {
                console.log("ERROR: SignUp Error", e.message || e);
                res.status(500).json({ message: e.message });
            }

        }
    }

    login = async (req, res) => {
        try {
            const user = await this.#service.login(req.body);
            res.header("X-Access-Token", user.accessToken).status(200).json(user);
        } catch (e) {
            if (e.message === "Invalid username") {
                console.log("ERROR: ", e.message || e);
                res.status(404).json({ message: e.message });
                return;
            } else if (e.message === "Invalid password") {
                console.log("ERROR: ", e.message || e);
                res.status(401).json({ message: e.message });
                return;
            }else {
                console.log("ERROR: Login Error", e.message || e);
                res.status(500).json({ message: e.message });
            }
        }
    }

    addDeck = async (req, res) => { 
        try {
            const user = await this.#service.addDeck(req.body);
            res.status(200).json(user);
        } catch (e) {
            if (e.message === "That Deck already exists") {
                console.log("ERROR: ", e.message || e);
                res.status(409).json({ message: e.message });
                return;
            } else {
                console.log("ERROR: Add Deck Error", e.message || e);
                res.status(500).json({ message: e.message });
            }
        }
    }

    updateDeck = async (req, res) => {
        try {
            const updated = await this.#service.updateDeck(req.body);
            res.status(200).json(updated);
        } catch (e) {
            if (e.message === "User not found") {
                console.log("ERROR: ", e.message || e);
                res.status(409).json({ message: e.message });
                return;
            } else if (e.message === "Deck not found") {
                console.log("ERROR: ", e.message || e);
                res.status(409).json({ message: e.message });
                return;
            } else {
                console.log("ERROR: Update Deck Error", e.message || e);
                res.status(400).json({ message: e.message });
            }
        }
    }

    getDecks = async (req, res) => {
        try {
            const userDecks = await this.#service.getDecks(req.query.id);
            res.status(200).json(userDecks);
        } catch (e) {
            if (e.message === "User not found") {
                console.log("ERROR: Get Decks Error", e.message || e);
                res.status(409).json({ message: e.message });
            }else if(e.message === "User has no decks") {
                console.log("ERROR: Get Decks Error", e.message || e);
                res.status(404).json({ message: e.message });
            }else {
                console.log("ERROR: Get Decks Error", e.message || e);
                res.status(500).json({ message: e.message });
            }

        }
    }   

    deleteDeck = async (req, res) => {
        try {
            const updated = await this.#service.deleteDeck(req.query.id, req.query.deckId);
            res.status(200).json(updated);
        } catch (e) {
            if (e.message === "Deck not found") {
                console.log("ERROR: ", e.message || e);
                res.status(409).json({ message: e.message });
                return;
            } else if (e.message === "User not found") {
                console.log("ERROR: ", e.message || e);
                res.status(409).json({ message: e.message });
                return;
            } else {
                console.log("ERROR: Delete Deck Error", e.message || e);
                res.status(500).json({ message: e.message });
            }
        }
    }
}
