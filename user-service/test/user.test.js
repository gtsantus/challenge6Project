import User from '../src/models/User.model.js';
import supertest from 'supertest';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import Server from '../src/server/Server.js';
import testData from './testData/sampleUser.js';
import UserController from "../src/controllers/User.controller.js";
import UserRoutes from "../src/routes/Users.routes.js";
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
        database = new Database(DB_URI);
        await database.connect();
        userServer = new Server(PORT, HOST, userRoutes);
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

    describe('POST /signUp', () => {
        it('should respond with a 200 status code and return an authentication token and a user id', async () => {
            const res = await request
                .post('/signUp')
                .send({ username: 'newUser', password: 'TestPassword1!' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('accessToken');
            expect(res.body).to.have.property('id');
            console.log(res.body);
        });

        it('should return a 409 error if username is already used', async () => {
            const res = await request
                .post('/signUp')
                .send({ username: 'testUser', password: 'TestPassword1!' });
            expect(res).to.have.status(409);
        });

        //on creation of a new user, the password should be hashed
        //on creation of a new user, the admin field should be false
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
                .send({ username: 'testUser', password: 'incorrectPassword' });
            expect(res).to.have.status(401);
        });
    });
 });