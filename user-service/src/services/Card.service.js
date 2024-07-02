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
            return await Card.findById(id);
        } catch (e) {
            throw e;
        }
    }
}
