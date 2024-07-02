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
            const card = await this.#service.getCardById(req.params.id);
            res.json(card);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}