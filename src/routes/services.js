const express = require('express');
const router = express.Router();
const serviceController = require('../controllers').services

/* 
Register new service
Body:
  - service_name
  - base_url
*/
router.post('/register', serviceController.registerService)


module.exports = router