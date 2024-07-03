import CardService from "../services/Card.service.js";

export default class CardController {
    #service

    constructor(service = new CardService()) {
        this.#service = service;
    }

    getAllCards = async (req, res) => {
        try {
            const cards = await this.#service.getAllCards();
            res.json(cards);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }

    getCard = async (req, res) => {
        try {
            const card = await this.#service.getCardById(req.query.id);
            res.json(card);
        } catch (e) {
            if (e.message === "Failed to Find Card") {
                console.log("ERROR: ", e.message || e);
                res.status(404).json({ message: e.message });
                return;
            }
            console.log("ERROR: GetCard Error: ", e.message || e);
            res.status(500).json({ message: e.message });
        }
    }
}