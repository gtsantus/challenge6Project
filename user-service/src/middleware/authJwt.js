import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

//const User you = model.user;
//const Role = model.role;

export default class AuthMiddleware{
    static verifyToken = (req, res, next) => {
        let token;
        if (req.cookies.user) {
            const userObj = JSON.parse(req.cookies.user);
            token = userObj.accessToken;
        }

        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({ message: "Unauthorized" });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
        
    static isAdmin = async (req, res, next) => {
        try {
            let user = await User.findById(req.userId);
            if (user.admin) {
                next();
            } else {
                res.status(403).send({ message: "Requires Admin Role" });
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };
}

