import User from '../src/models/User.model.js';
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
            await User.insertMany(testData);
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

    xdescribe('POST /signUp', () => {
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

    xdescribe('POST /login', () => {
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
 
xdescribe('Testing Card Services', () => {
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
            await User.insertMany(testData);
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
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b8' });
            expect(res).to.have.status(404);
        });

        it('should return a 500 error if there is an error', async () => {
            const res = await request
                .get('/getCard')
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b9' });
            expect(res).to.have.status(500);
        });
    });
});

xdescribe('Testing Deck Services', () => {
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
            await User.insertMany(testData);
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

        describe('POST /addDeck', () => {
        it('should add a deck to the user', async () => {
            const res = await request
                .post('/addDeck')
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', deckName: "newDeck", deckCards: testDataCards.cards[0], deckFaction: "Wizard" });
            expect(res).to.have.status(200);
            expect(res.body[1]).to.have.property('name', 'newDeck');
            expect(res.body[1]).to.have.property("faction", "Wizard");
            expect(res.body[1]).to.have.property("cards");
            expect(res.body[1].cards).to.have.lengthOf(1);
        });
    });

    describe('POST /updateDeck', () => {
        it('should update the deck of the user', async () => {
            const res = await request
                .post('/updateDeck')
                .send({ id: '60f3e3f3e4e4c7e6f3b0d2b7', deckName: 'testDeck', deckCards: testDataCards.cards });
            expect(res).to.have.status(200);
            expect(res.body[0].cards).to.have.lengthOf(2);
        });
    });

    describe('GET /getDecks', () => {
        it('should return the decks of the user', async () => {
            const res = await request
                .get('/getDecks')
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b7' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.lengthOf(1);
        });

        it('should return a 404 error if the user is not found', async () => {
            const res = await request
                .get('/getDecks')
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b8' });
            expect(res).to.have.status(404);
        });

        it('should return a 500 error if there is an error', async () => {
            const res = await request
                .get('/getDecks')
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b9' });
            expect(res).to.have.status(500);
        });
    });
    //should error nicely if user has no decks

    describe('GET /deleteDeck', () => { 
        it('should delete a deck from the user', async () => {
            const res = await request
                .delete('/deleteDeck')
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b7', deckId: '668407f9d3d06290b766a527' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.lengthOf(0);
        });

        it('should return a 404 error if the user is not found', async () => {
            const res = await request
                .delete('/deleteDeck')
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b8', deckId: '668407f9d3d06290b766a527' });
            expect(res).to.have.status(404);
        });

        it('should return a 500 error if there is an error', async () => {
            const res = await request
                .delete('/deleteDeck')
                .query({ id: '60f3e3f3e4e4c7e6f3b0d2b9', deckId: '60f3e3f3e4e4c7e6f3b0d2b7' });
            expect(res).to.have.status(500);
        });
    });
});