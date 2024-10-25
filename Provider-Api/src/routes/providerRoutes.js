const express = require('express');
const router = express.Router();
const {
    getAllProviders,
    createProvider,
    updateProvider,
    deleteProvider
} = require('../controllers/providerController');

router
    .route('/')
    .get(getAllProviders)
    .post(createProvider);

router
    .route('/:id')
    .put(updateProvider)
    .delete(deleteProvider);

module.exports = router;