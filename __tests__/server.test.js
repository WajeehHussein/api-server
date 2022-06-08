'use strict';
const { app } = require('../src/server')

const supertest = require('supertest')
const mockRequest = supertest(app);

const { db } = require('../src/models/index')

beforeAll(async () => {
    await db.sync();
})

describe('', () => {
    test('not Found 404 bad route', async () => {
        const res = await mockRequest.get('/not');
        expect(res.status).toBe(404);
    })
    test('not Found 404 bad method', async () => {
        const res = await mockRequest.del('/not');
        expect(res.status).toBe(404);
    })
    test('add a data', async () => {
        const res = await mockRequest.post('/food').send(
            {
                name: "mansaf",
                price: "22"
            }
        );
        expect(res.status).toBe(201);
    })
    test('get all data', async () => {
        const res = await mockRequest.get('/food');
        expect(res.status).toBe(200)
    })
    test('get a data ( one )', async () => {
        const res = await mockRequest.get('/food/1');
        expect(res.status).toBe(200)
    })
    test('update a data ( one )', async () => {
        const res = await mockRequest.put('/food/1');
        expect(res.status).toBe(201)
    })
    test('delete a data ( one )', async () => {
        const res = await mockRequest.delete('/food/1');
        expect(res.status).toBe(204)
    })
})

afterAll(async () => {
    await db.drop();
})