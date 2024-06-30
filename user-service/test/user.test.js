import User from '../src/models/User.model';

import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';

import Server from '../src/server/Server.js';
import testData from './testData/sampleUser.js';

const { request } = chai.use(chaiHttp);

describe('Testing user login and sign up', () => {
    // Before each test clear then refill the database
    beforeEach(async () => {
        await User.deleteMany({});
        await User.insert(testData);
    });

    describe('POST /signUp', () => {
        it('should return an authentication token and a user id', async () => {
            const res = await request(Server).post('/signUp').send({ username: 'testUser', password: 'TestPassword1!' });
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('accessToken');
            expect(res.body).to.have.property('id');
        });

        it('should return a 409 error if username is already used', async () => {
            const res = await request(Server).post('/signUp').send({ username: 'testUser', password: 'TestPassword1!' });
            expect(res).to.have.status(409);
        });

        it('should return a 400 error if password is in an invalid format', async () => {
            const res = await request(Server).post('/signUp').send({ username: 'testUser', password: 'testpassword' });
            expect(res).to.have.status(400);
        });
    });
    //Test 1: Sign Up returns an authentication token and a user id
    //Test 2: Login returns an authentication token and a user id
    //Test 3: Sign Up Fails with a 409 error if username is already used
    //Test 4: Sign Up Fails with a 400 error if password is in an invalid format
    //Test 5: Login Fails with a 401 error if password is incorrect
 });