import jwt from "jsonwebtoken";
import User from "../src/models/User.model.js";

//const User you = model.user;
//const Role = model.role;

export default class AuthMiddleware{
    verifyToken = (req, res, next) => { 
        let token = req.headers["x-access-token"];

        if(!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            req.userId = decoded.id;
            next();
        }
    });

/*     isUser = async (req, res, next) => {
        let user = await User.findById(req.userId);
        role = await Role.find({ _id: { $in: user.roles } }, (error, roles) => {
            if(error) {
                res.status(500).json({ message: error });
                return;
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "user") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Needs User Role" });
            return;
        });
    }; */
        
    isAdmin = async (req, res, next) => {
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
}

