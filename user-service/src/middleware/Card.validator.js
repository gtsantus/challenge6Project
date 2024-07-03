import * as expressValidator from 'express-validator';

export default class CardValidator {
    static validateCard() {
        try {
            return [
                expressValidator.body('name').isString().notEmpty().withMessage('Username is required and must be a string'),
                expressValidator.body('type').isString().notEmpty().isIn(['Commander', 'Minion', 'Spell', 'Camp', 'Token']).withMessage('Type is required and must be a string of either Commander, Minion, Spell, Camp or Token'),
                expressValidator.body('cost').isString().notEmpty().withMessage('Cost is required and must be a string'),
                expressValidator.body('faction').isString().notEmpty().isIn(['Tech', 'Undead', 'Order', 'Druid', 'Guerilla', 'Wizard']).withMessage('Faction is required and must be a string of either Tech, Undead, Order, Druid, Guerilla or Wizard'),
                expressValidator.body('power').isString().notEmpty().withMessage('Power is required and must be a string'),
                expressValidator.body('toughness').isString().notEmpty().withMessage('Toughness is required and must be a string'),
                expressValidator.body('cardText').isString().notEmpty().withMessage('Card Text is required and must be a string'),
                expressValidator.body('flavourText').isString().notEmpty().withMessage('Flavour Text is required and must be a string'),
                expressValidator.body('legendary').isBoolean().notEmpty().withMessage('Legendary is required and must be a boolean'),
                expressValidator.body('rows').isArray().isIn(['Front', 'Middle', 'Back']).withMessage('Rows must be an array'),
                CardValidator.handleErrors,
            ]
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    static handleErrors(req, res, next) {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
}