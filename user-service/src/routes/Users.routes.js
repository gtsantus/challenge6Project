import Router from "express";
import UserValidator from "../middleware/User.validator.js";
import authMiddleWare from "../middleware/authJwt.js";

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
        this.#router.post("/login", UserValidator.validateUser(), this.#controller.login);
        this.#router.post("/signUp", UserValidator.validateUser(), this.#controller.signUp);
        this.#router.post("/addDeck", authMiddleWare.verifyToken, this.#controller.addDeck);
        this.#router.put("/updateDeck", authMiddleWare.verifyToken, this.#controller.updateDeck);
        this.#router.get("/getDecks", authMiddleWare.verifyToken, this.#controller.getDecks);
        this.#router.delete("/deleteDeck", authMiddleWare.verifyToken, this.#controller.deleteDeck);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routerStartPoint;
    };
}