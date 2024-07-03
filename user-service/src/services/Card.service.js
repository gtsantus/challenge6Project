import { get } from "mongoose";
import Card from "../models/Card.model.js";
import User from "../models/User.model.js";

export default class UserService {
    getAllCards = async () => {
        try {
            return await Card.find({});
        } catch (e) {
            throw e;
        }
    }

    getCardById = async (id) => {
        try {
            const temp = await Card.findById(id);
            if (!temp) {
                throw new Error("Failed to Find Card");
            }
            return temp;
        } catch (e) {
            throw e;
        }
    }
}
