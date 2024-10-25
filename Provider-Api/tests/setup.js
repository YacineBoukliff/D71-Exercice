const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

// Configuration de la base de données de test
beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
});

// Nettoyage après tous les tests
afterAll(async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error closing the database connection:', error);
        process.exit(1);
    }
});