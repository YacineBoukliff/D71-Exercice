const express = require('express');
const router = express.Router();
const {
    getAllServices,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');

// Define routes
router
    .route('/')
    .get(getAllServices)
    .post(createService);

router
    .route('/:id')
    .put(updateService)
    .delete(deleteService);

module.exports = router;