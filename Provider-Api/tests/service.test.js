const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Service = require('../src/models/Service');
const Provider = require('../src/models/Provider');

describe('Service API Tests', () => {
    let providerId;
    let serviceId;

    beforeAll(async () => {
        // Créer un prestataire pour les tests
        const provider = await Provider.create({
            name: 'Test Provider',
            email: 'test@example.com',
            phone: '1234567890'
        });
        providerId = provider._id;

        // Vider la collection services
        await Service.deleteMany({});
    });

    afterAll(async () => {
        await Provider.deleteMany({});
        await Service.deleteMany({});
        await mongoose.connection.close();
    });

    // Test de création d'un service
    describe('POST /api/services', () => {
        it('should create a new service', async () => {
            const res = await request(app)
                .post('/api/services')
                .send({
                    name: 'Test Service',
                    description: 'Test Description',
                    price: 100,
                    provider: providerId
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe('Test Service');
            expect(res.body.data.price).toBe(100);

            serviceId = res.body.data._id;
        });

        it('should fail to create service without required fields', async () => {
            const res = await request(app)
                .post('/api/services')
                .send({
                    name: 'Test Service'
                });

            expect(res.statusCode).toBe(400);
        });
    });

    // Test de récupération des services
    describe('GET /api/services', () => {
        it('should get all services', async () => {
            const res = await request(app)
                .get('/api/services');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // Test de mise à jour d'un service
    describe('PUT /api/services/:id', () => {
        it('should update a service', async () => {
            const res = await request(app)
                .put(`/api/services/${serviceId}`)
                .send({
                    name: 'Updated Service',
                    price: 150
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.name).toBe('Updated Service');
            expect(res.body.data.price).toBe(150);
        });
    });

    // Test de suppression d'un service
    describe('DELETE /api/services/:id', () => {
        it('should delete a service', async () => {
            const res = await request(app)
                .delete(`/api/services/${serviceId}`);

            expect(res.statusCode).toBe(200);
        });

        it('should fail to delete non-existent service', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .delete(`/api/services/${fakeId}`);

            expect(res.statusCode).toBe(404);
        });
    });
});