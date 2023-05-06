const { Router } = require('express');

const router = Router();

const categoryController = require('../controllers/categoryController');

router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(categoryController.createOne);

router
  .route('/:id')
  .get(categoryController.getOne)
  .patch(categoryController.updateOne)
  .delete(categoryController.deleteOne);

module.exports = router;
