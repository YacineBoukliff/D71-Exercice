const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Provider = require('../src/models/Provider');

describe('Provider API Tests', () => {
    beforeAll(async () => {
        await Provider.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    let providerId;

    describe('POST /api/providers', () => {
        it('should create a new provider', async () => {
            const res = await request(app)
                .post('/api/providers')
                .send({
                    name: 'Test Provider',
                    email: 'test@example.com',
                    phone: '1234567890',
                    address: 'Test Address'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe('Test Provider');
            providerId = res.body.data._id;
        });

        it('should fail to create provider without required fields', async () => {
            const res = await request(app)
                .post('/api/providers')
                .send({
                    name: 'Test Provider'
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('GET /api/providers', () => {
        it('should get all providers', async () => {
            const res = await request(app)
                .get('/api/providers');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('PUT /api/providers/:id', () => {
        it('should update a provider', async () => {
            const res = await request(app)
                .put(`/api/providers/${providerId}`)
                .send({
                    name: 'Updated Provider'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.name).toBe('Updated Provider');
        });
    });

    describe('DELETE /api/providers/:id', () => {
        it('should delete a provider', async () => {
            const res = await request(app)
                .delete(`/api/providers/${providerId}`);

            expect(res.statusCode).toBe(200);
        });
    });
});