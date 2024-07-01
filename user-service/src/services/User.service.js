import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserService {
    signUp = async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (user) {
            throw new Error("That User already exists");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            password: hashedPassword
        });

        await newUser.save();
        console.log(hashedPassword);

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });

        return { accessToken: token, id: newUser._id }
    }

    login = async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("Invalid username");
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (passwordMatches) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: 86400,
            });
            return { accessToken: token, id: user._id };
        } else {
            throw new Error("Invalid password");
        };
    }
}