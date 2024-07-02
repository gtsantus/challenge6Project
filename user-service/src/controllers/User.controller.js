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
}