const { createClient } = require('redis');
const logger = require('../utils/logger');

// Créer un client Redis avec gestion d'erreur
const createRedisClient = () => {
    try {
        const client = createClient({
            socket: {
                host: 'localhost',
                port: 6379
            }
        });

        client.on('connect', () => {
            logger.info('Redis Client Connected');
        });

        client.on('error', (err) => {
            logger.error('Redis Client Error:', err);
        });

        return client;
    } catch (error) {
        logger.error('Error creating Redis client:', error);
        return null;
    }
};

let client = null;

const cacheService = {
    // Initialiser la connexion
    async connect() {
        try {
            if (!client) {
                client = createRedisClient();
                await client.connect();
            }
            return client;
        } catch (error) {
            logger.error('Error connecting to Redis:', error);
            return null;
        }
    },

    // Récupérer une valeur
    async get(key) {
        try {
            if (!client) return null;
            const value = await client.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            logger.error('Error getting cache:', error);
            return null;
        }
    },

    // Définir une valeur
    async set(key, value, ttl = 3600) {
        try {
            if (!client) return false;
            await client.set(key, JSON.stringify(value), { EX: ttl });
            return true;
        } catch (error) {
            logger.error('Error setting cache:', error);
            return false;
        }
    },

    // Supprimer une valeur
    async del(key) {
        try {
            if (!client) return false;
            await client.del(key);
            return true;
        } catch (error) {
            logger.error('Error deleting cache:', error);
            return false;
        }
    },

    // Nettoyer le cache
    async flush() {
        try {
            if (!client) return false;
            await client.flushAll();
            return true;
        } catch (error) {
            logger.error('Error flushing cache:', error);
            return false;
        }
    },

    // Fermer la connexion
    async disconnect() {
        try {
            if (client) {
                await client.quit();
                client = null;
            }
        } catch (error) {
            logger.error('Error disconnecting from Redis:', error);
        }
    }
};

module.exports = cacheService;