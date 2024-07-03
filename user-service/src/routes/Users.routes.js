import Router from "express";
import UserValidator from "../middleware/User.validator.js";

export default class UsersRoutes{ 
    #controller;
    #routerStartPoint;
    #router;

    constructor(controller, routeStartPoint = "/") { 
        this.#controller = controller;
        this.#router = new Router();
        this.#routerStartPoint = routeStartPoint;
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        this.#router.post("/login", this.#controller.login);
        this.#router.post("/signUp", UserValidator.validateUser(), this.#controller.signUp);
        this.#router.post("/addDeck", this.#controller.addDeck);
        this.#router.put("/updateDeck", this.#controller.updateDeck);
        this.#router.get("/getDecks", this.#controller.getDecks);
        this.#router.delete("/deleteDeck", this.#controller.deleteDeck);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routerStartPoint;
    };
}