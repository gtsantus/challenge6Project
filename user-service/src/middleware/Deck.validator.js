import * as expressValidator from 'express-validator';

export default class DeckValidator{
    static validateDeck() {
        try {
            return [
                expressValidator.body('name').isString().notEmpty().withMessage('Name is required'),
                expressValidator.body('faction').isString().isIn(['Tech', 'Undead', 'Order', 'Druid', 'Guerilla', 'Wizard']).withMessage('Faction is required and must be a string of either Tech, Undead, Order, Druid, Guerilla or Wizard'),
                expressValidator.body('cards').isArray().withMessage('Cards must be an array'),
                DeckValidator.handleErrors,
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