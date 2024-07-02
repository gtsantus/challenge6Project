import * as expressValidator from 'express-validator';
import User from '../models/User.model.js';

export default class UserValidator{
    static validateUser() {
        try {
            return [
                expressValidator.body('username').isString().notEmpty().withMessage('Username is required'),
                expressValidator.body('password').isString().notEmpty().withMessage('Password is required'),
                expressValidator.body('decks').optional().isArray().withMessage('Decks must be an array'),
                UserValidator.handleErrors,
            ]
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    static handleErrors(req, res, next) {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
}