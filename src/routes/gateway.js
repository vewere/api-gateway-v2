const express = require('express');
const router = express.Router();
const gatewayController = require('../controllers').gateway


/*
Makes call to specified endpoint
Body:
  - service_name
  - payload (optional)
 */
router.use('/route', gatewayController.route)


module.exports = router