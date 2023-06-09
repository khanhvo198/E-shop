const { Router } = require('express');

const router = Router();
const productController = require('../controllers/productController');

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productController.uploadImageProduct,
    productController.resizeImageProduct,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    productController.uploadImageProduct,
    productController.resizeImageProduct,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

module.exports = router;
