const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.updateUser);
router
  .route('/:id')
  .get(userController.findUser)
  .post(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
