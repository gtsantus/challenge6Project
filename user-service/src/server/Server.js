import express from "express";
import cors from "cors";

export default class Server{
    #app;
    #host;
    #port;
    #routers;
    #server;

    constructor(port, host, routers) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#routers = routers;
    }

    getApp = () => {
        return this.#app;
    };   
    
    start = () => {
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening on http://${this.#host}:${this.#port}`);
        });
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use((req, res, next) => {
            res.header(
                "Access-Control-Allow-Headers",
                "X-Access-Token, Origin, Content-Type, Accept"
            );
            next();
        });
        this.#routers.forEach(router => {
            this.#app.use(router.getRouteStartPoint(), router.getRouter());
        });
    }

    close() {
        this.#server?.close();
    }
}