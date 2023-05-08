const { Router } = require('express');

const router = Router();

const categoryController = require('../controllers/categoryController');

router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(
    categoryController.uploadImageCategory,
    categoryController.resizeImageCategory,
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
