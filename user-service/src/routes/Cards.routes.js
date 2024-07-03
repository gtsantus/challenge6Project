import Router from "express";
import authMiddleWare from "../middleware/authJwt.js";
import CardValidator from "../middleware/Card.validator.js";

export default class CardsRoutes{ 
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
        this.#router.post("/addCard", [authMiddleWare.verifyToken, authMiddleWare.isAdmin, CardValidator.validateCard()], this.#controller.addCard);
        this.#router.get("/getAllCards", this.#controller.getAllCards);
        this.#router.get("/getCard", this.#controller.getCard);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routerStartPoint;
    };
}