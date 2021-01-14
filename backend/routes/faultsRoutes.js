const express = require('express');
const router = express.Router();
const faultController = require('../controllers/faultsController');
const auth = require('../middleware/authMiddleware');
router
  .route('/')
  .get(auth, faultController.getAllFaults)
  .post(faultController.createFault);
router
  .route('/:id')
  .get(auth, faultController.findFault)
  .patch(auth, faultController.updateFault)
  .delete(auth, faultController.deleteFault);

module.exports = router;
