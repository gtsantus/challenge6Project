import User from '../src/models/User.model.js';
import Card from '../src/models/Card.model.js';
import supertest from 'supertest';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import Server from '../src/server/Server.js';
import testData from './testData/sampleUser.js';
import testDataCards from './testData/sampleCards.js';
import UserController from "../src/controllers/User.controller.js";
import UserRoutes from "../src/routes/Users.routes.js";
import CardController from "../src/controllers/Card.controller.js";
import CardRoutes from "../src/routes/Cards.routes.js";
import Config from "../src/config/Config.js";
import Database from "../src/database/Database.js";
import jwt from "jsonwebtoken";
import e from 'express';

chai.use(chaiHttp);


describe('Testing user login and sign up', () => {
    let userServer;
    let database;
    let request;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        const userController = new UserController();
        const userRoutes = new UserRoutes(userController);
        const cardController = new CardController();
        const cardRoutes = new CardRoutes(cardController);
        database = new Database(DB_URI);
        await database.connect();
        userServer = new Server(PORT, HOST, [userRoutes, cardRoutes]);
        userServer.start();
        request = supertest(userServer.getApp());
    })
    
    beforeEach(async () => {
        try {
            await User.deleteMany();
            console.log("Cleared Database");
        } catch {
            console.log("Error clearing database");
            throw new Error();
        };
        try {
            await User.insertMany(testData.users);
            console.log("Inserted test data");
        } catch (e) {
            console.log(e);
            console.log("Error inserting test data");
            throw new Error();
        };
    }); 

    after(async () => {
        await userServer.close();
        await database.close();
    });

    describe('POST /signUp', () => {
        it('should respond with a 200 status code and return an authentication token and a user id', async () => {
            const res = await request
                .post('/signUp')
                .send({ username: 'newUser', password: 'TestPassword1!' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('accessToken');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('admin');
        });

        it('should return a 409 error if username is already used', async () => {
            const res = await request
                .post('/signUp')
                .send({ username: 'testUser', password: 'TestPassword1!' });
            expect(res).to.have.status(409);
        });

        it('should return a 400 error not sent a username', async () => {
            const res = await request
                .post('/signUp')
                .send({ password: 'invalidPassword' });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if sent an invalid password', async () => {
            const res = await request
                .post('/signUp')
                .send({ username: 'newUser', password: 'invalidPassword' });
            expect(res).to.have.status(400);
        });

        it('admin should be false on account creation', async () => {
            const res = await request
                .post('/signUp')
                .send({ username: 'newUser', password: 'TestPassword1!' });
            expect(res.body).to.have.property('admin', false);
        });
    });

    describe('POST /login', () => {
        it('should return an authentication token and a user id', async () => {
            const res = await request
                .post('/login')
                .send({ username: 'testUser', password: 'TestPassword1!' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('accessToken');
            expect(res.body).to.have.property('id');
        });

        it('should return a 401 error if password is incorrect', async () => {
            const res = await request
                .post('/login')
                .send({ username: 'testUser', password: 'incorrectPassword1!' });
            expect(res).to.have.status(401);
        });

        it('should return a 401 error if username is incorrect', async () => {
            const res = await request
                .post('/login')
                .send({ username: 'incorrectUser', password: 'TestPassword1!' });
            expect(res).to.have.status(401);
        });

        it('should return a 400 error if username is not sent', async () => {    
            const res = await request
                .post('/login')
                .send({ password: 'TestPassword1!' });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if password is not sent', async () => {   
            const res = await request
                .post('/login')
                .send({ username: 'testUser' });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if username is not a string', async () => {
            const res = await request
                .post('/login')
                .send({ username: 123, password: 'TestPassword1!' });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if password is not a string', async () => {    
            const res = await request
                .post('/login')
                .send({ username: 'testUser', password: 123 });
            expect(res).to.have.status(400);
        });
    });

});
 
describe('Testing Card Services', () => {
    let userServer;
    let database;
    let request;
    let Cookie;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        const userController = new UserController();
        const userRoutes = new UserRoutes(userController);
        const cardController = new CardController();
        const cardRoutes = new CardRoutes(cardController);
        database = new Database(DB_URI);
        await database.connect();
        userServer = new Server(PORT, HOST, [userRoutes, cardRoutes]);
        userServer.start();
        request = supertest(userServer.getApp());
    })
    
    beforeEach(async () => {
        try {
            await Card.deleteMany();
            console.log("Cleared Database");
        } catch {
            console.log("Error clearing database");
            throw new Error();
        };
        try {
            await Card.insertMany(testDataCards.cards);
            console.log("Inserted test data");
        } catch (e) {
            console.log(e);
            console.log("Error inserting test data");
            throw new Error();
        };
        const token = jwt.sign({ id: "60f3e3f3e4e4c7e6f3b0d2b7" }, process.env.JWT_SECRET, {
                expiresIn: 86400,
        });
        Cookie = 'user=' + JSON.stringify({ accessToken: token, id: "60f3e3f3e4e4c7e6f3b0d2b7", admin: true })
    });

    after(async () => {
        await userServer.close();
        await database.close();
    });

    describe('GET /getCard', () => {
        it('should return a card', async () => {
            const res = await request
                .get('/getCard')
                .query({ id: '668309d9e79da29bc34cf21a' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Test Spell');
        });

        it('should return a 404 error if the card is not found', async () => {
            const res = await request
                .get('/getCard')
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b9' });
            expect(res).to.have.status(404);
        });

        it('should return a 500 error if there is an error', async () => {
            const res = await request
                .get('/getCard')
                .query({ id: 'Invalid' });
            expect(res).to.have.status(500);
        });
    });

    describe('GET /getAllCards', () => {
        it('should return all cards', async () => {
            const res = await request
                .get('/getAllCards');
            expect(res).to.have.status(200);
            expect(res.body).to.have.lengthOf(2);
        });
    });

    describe('POST /addCard', () => {   
        it('should add a card to the database', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: 'Wizard', power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavour Text", legendary: false });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("name", "newCard");
            expect(res.body).to.have.property("type", "Spell");
            expect(res.body).to.have.property("cost", "0");
            expect(res.body).to.have.property("faction", "Wizard");
            expect(res.body).to.have.property("power", "0");
            expect(res.body).to.have.property("toughness", "0");
            expect(res.body).to.have.property("rows");
            expect(res.body).to.have.property("cardText", "Card Text");
            expect(res.body).to.have.property("flavourText", "Flavour Text");
            expect(res.body).to.have.property("legendary", false);
        });

        it('should return a 409 error if the card already exists', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "Test Spell", type: "Spell", cost:"0", faction: 'Wizard', power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(409);
        });

        it('should return a 403 error if the user sent is not an admin', async () => {
            const token = jwt.sign({ id: "6685e6046782b4f828607b5c" }, process.env.JWT_SECRET, {
                expiresIn: 86400,
            });
            Cookie = 'user=' + JSON.stringify({ accessToken: token, id: "6685e6046782b4f828607b5c", admin: true })
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: 'Wizard', power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(403);
        });
        
        it('should return a 403 error if the user has an invalid login token', async () => { 
            let token = jwt.sign({ id: "6685de316782b4f828607b57" }, process.env.JWT_SECRET, {
                expiresIn: 86400,
            });
            token = token + "invalid";
            Cookie = 'user=' + JSON.stringify({ accessToken: token, id: "60f3e3f3e4e4c7e6f3b0d2b7", admin: false })
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "Test Spell", type: "Spell", cost: "0", faction: "Wizard", power: "0", toughness: "0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(403);
        });

        it('should return a 400 error if a field is missing', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Wizard", power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text"});
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if a name is not a string', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: 123, type: "Spell", cost:"0", faction: "Wizard", power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if a cost is not a string', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:123, faction: "Wizard", power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });
        
        it('should return a 400 error if a power is not a string', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Wizard", power:123, toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });
        
        it('should return a 400 error if a toughness is not a string', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Wizard", power:"0", toughness:123, rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });
        
        it('should return a 400 error if a cardText is not a string', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Wizard", power:"0", toughness:"0", rows: [], cardText: 123, flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });
        
        it('should return a 400 error if a flavorText is not a string', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Wizard", power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: 123, legendary: false });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if a legendary is not a boolean', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Wizard", power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: "Invalid" });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if faction is not a valid enum', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Invalid", power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if type is not a valid enum', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Invalid", cost:"0", faction: "Wizard", power:"0", toughness:"0", rows: [], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if rows is not an array', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Wizard", power:"0", toughness:"0", rows: 123, cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });
        
        it('should return a 400 error if rows is not a valid enum', async () => {
            const res = await request
                .post('/addCard')
                .set('Cookie', Cookie)
                .send({ name: "newCard", type: "Spell", cost:"0", faction: "Invalid", power:"0", toughness:"0", rows: ["Invalid"], cardText: "Card Text", flavourText: "Flavor Text", legendary: false });
            expect(res).to.have.status(400);
        });
    });
});

describe('Testing Deck Services', () => {
    let userServer;
    let database;
    let request;
    let Cookie;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        const userController = new UserController();
        const userRoutes = new UserRoutes(userController);
        const cardController = new CardController();
        const cardRoutes = new CardRoutes(cardController);
        database = new Database(DB_URI);
        await database.connect();
        userServer = new Server(PORT, HOST, [userRoutes, cardRoutes]);
        userServer.start();
        request = supertest(userServer.getApp());
    })
    
    beforeEach(async () => {
        try {
            await User.deleteMany();
            console.log("Cleared Database");
        } catch {
            console.log("Error clearing database");
            throw new Error();
        };
        try {
            await User.insertMany(testData.users);
            console.log("Inserted test data");
        } catch (e) {
            console.log(e);
            console.log("Error inserting test data");
            throw new Error();
        };
        const token = jwt.sign({ id: "60f3e3f3e4e4c7e6f3b0d2b7" }, process.env.JWT_SECRET, {
                expiresIn: 86400,
        });
        Cookie = 'user=' + JSON.stringify({ accessToken: token, id: "60f3e3f3e4e4c7e6f3b0d2b7", admin: true })
    });

    after(async () => {
        await userServer.close();
        await database.close();
    });

    describe('POST /addDeck', () => {
        it('should add a deck to the user', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', name: "newDeck", cards: testDataCards.cards, faction: "Wizard" });
            expect(res).to.have.status(200);
            expect(res.body[1]).to.have.property('name', 'newDeck');
            expect(res.body[1]).to.have.property("faction", "Wizard");
            expect(res.body[1]).to.have.property("cards");
            expect(res.body[1].cards).to.have.lengthOf(2);
        });

        it('should return a 409 error if the deck already exists', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', name: "testDeck", cards: testDataCards.cards, faction: "Wizard" });
            expect(res).to.have.status(409);
        });

        it('should return a 409 error if the user could not be found', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b8', name: "testDeck", cards: testDataCards.cards, faction: "Wizard" });
            expect(res).to.have.status(409);
        });

        it('should return a 400 error if a field is missing', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', cards: testDataCards.cards, faction: "Wizard" });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if a name is not a string', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', name: 123, cards: testDataCards.cards, faction: "Wizard" });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if cards is not an array', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', name: "newDeck", cards: 123, faction: "Wizard" });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if faction is not a string', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', name: "newDeck", cards: testDataCards.cards, faction: 123 });
            expect(res).to.have.status(400);
        });

        it('should return a 400 error if faction is not a valid enum', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', name: "newDeck", cards: testDataCards.cards, faction: "Invalid" });
            expect(res).to.have.status(400);
        });

        it('should return a 500 error there is another error', async () => {
            const res = await request
                .post('/addDeck')
                .set('Cookie', Cookie)
                .send({ id: 'Invalid', name: "newDeck", cards: testDataCards.cards, faction: "Wizard" });
            expect(res).to.have.status(500);
        });
    });

    describe('POST /updateDeck', () => {
        it('should update the deck of the user', async () => {
            const res = await request
                .put('/updateDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', name: 'testDeck', cards: testDataCards.cards, faction: "Wizard"});
            expect(res).to.have.status(200);
            expect(res.body[0].cards).to.have.lengthOf(2);
        });

        it('should return a 409 error if the deck is not found', async () => {
            const res = await request
                .put('/updateDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', name: 'Invalid', cards: testDataCards.cards, faction: "Wizard"});
            expect(res).to.have.status(409);
        });

        it('should return a 409 error if the user is not found', async () => {
            const res = await request
                .put('/updateDeck')
                .set('Cookie', Cookie)
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b8', name: 'testDeck', cards: testDataCards.cards, faction: "Wizard" });
            expect(res).to.have.status(409);
        });

        it('should return a 500 error if an error is thrown', async () => {
            const res = await request
                .put('/updateDeck')
                .set('Cookie', Cookie)
                .send({ id: 'Invalid', name: 'testDeck', cards: testDataCards.cards, faction: "Wizard" });
            expect(res).to.have.status(500);
        });
    });

    describe('GET /getDecks', () => {
        it('should return the decks of the user', async () => {
            const res = await request
                .get('/getDecks')
                .set('Cookie', Cookie)
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b7' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.lengthOf(1);
        });

        it('should return a 409 error if the user is not found', async () => {
            const res = await request
                .get('/getDecks')
                .set('Cookie', Cookie)
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b8' });
            expect(res).to.have.status(409);
        });

        it('should return a 404 error if the user has no decks', async () => {
            const res = await request
                .get('/getDecks')
                .set('Cookie', Cookie)
                .query({ id: '6685e6046782b4f828607b5c' });
            expect(res).to.have.status(404);
        });

        it('should return a 500 error if there is an error', async () => {
            const res = await request
                .get('/getDecks')
                .set('Cookie', Cookie)
                .query({ id: 'Invalid' });
            expect(res).to.have.status(500);
        });
    });

    describe('GET /deleteDeck', () => { 
        it('should delete a deck from the user', async () => {
            const res = await request
                .delete('/deleteDeck')
                .set('Cookie', Cookie)
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b7', deckId: '668407f9d3d06290b766a527' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.lengthOf(0);
        });

        it('should return a 409 error if the user is not found', async () => {
            const res = await request
                .delete('/deleteDeck')
                .set('Cookie', Cookie)
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b8', deckId: '668407f9d3d06290b766a527' });
            expect(res).to.have.status(409);
        });

        it('should return a 409 error if the deck is not found', async () => {
            const res = await request
                .delete('/deleteDeck')
                .set('Cookie', Cookie)
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b7', deckId: '668407f9d3d06290b766a528' });
            expect(res).to.have.status(409);
        });

        it('should return a 500 error if there is an error', async () => {
            const res = await request
                .delete('/deleteDeck')
                .set('Cookie', Cookie)
                .query({ id: 'Invalid', deckId: '60f3e3f3e4e4c7e6f3b0d2b7' });
            expect(res).to.have.status(500);
        });
    });
});