const express=require('express');
const {body,param}=require('express-validator')
const AuthMiddleware=require('../middleware/authMiddleware');
const ProductController=require('../controllers/productController')
const validate = require('../middleware/errorHandler');
const routes=express.Router();

const validateProduct=[
    body('name').notEmpty().withMessage('PRODUCT NAME IS REQUIRED'),
    body('price').isFloat({gt:0}).withMessage('PRICE MUST BE GREATER THAN 0'),
    body('stock').isInt({gt:0}).withMessage('STOCK MUST BE A POSITIVE INTEGER')
];
const validateProductId=[
    param('id').isInt().withMessage('PRODUCT ID MUST BE A VALID INTEGER'),
];

routes.get('/',ProductController.getAllProducts);
routes.get('/:id',validate,validateProductId,ProductController.getProductById);
routes.post(
    '/',
    AuthMiddleware.authenticateToken,
    AuthMiddleware.authorizeRoles('admin'),
    validateProduct,
    validate,
    ProductController.createProduct
);
routes.put(
    '/:id',
    AuthMiddleware.authenticateToken,
    AuthMiddleware.authorizeRoles('admin'),
    validate,
    [...validateProductId,...validateProduct],
    ProductController.updateProduct
);
routes.delete(
    '/:id',
    AuthMiddleware.authenticateToken,
    AuthMiddleware.authorizeRoles('admin'),
    validateProductId,
    validate,
    ProductController.deleteProduct
);

module.exports=routes;