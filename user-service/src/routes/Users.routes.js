import Router from "express";
import UserController from "../controllers/User.controller.js";


export default class UsersRoutes{ 
    #controller;
    #routerStartPoint;
    #router;

    constructor(controller = new UserController(), routeStartPoint = "/") { 
        this.#controller = controller;
        this.#router = new Router();
        this.#routerStartPoint = routeStartPoint;
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        this.#router.post("/login", this.#controller.login);
        this.#router.post("/signUp", this.#controller.signUp);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routerStartPoint;
    };
}