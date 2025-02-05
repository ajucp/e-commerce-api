const express=require('express');
const{body,param}=require('express-validator')
const OrderController=require('../controllers/orderController');
const AuthMiddleware=require('../middleware/authMiddleware');
const validate = require('../middleware/errorHandler');
const routes=express.Router();

const validateOrder=[
    body('userId').isInt().withMessage('USER ID MUST BE VALID INTEGER'),
    body('items').isArray({min:1}).withMessage('ITEMS MUST BE AN ARRAY WITH AT LEAST ONE ITEM'),
    body('items.*.productId').isInt().withMessage('PRODUCT ID MUST BE A VALID INTEGER'),
    body('items.*.quantity').isInt({gt:0}).withMessage('QUANTITY MUST BE A POSITIVE INTEGER'),
    body('items.*.price').isFloat({gt:0}).withMessage('PRICE MUST BE GREATER THAN 0')
]
const ValidateOrderId=[
    param('id').isInt().withMessage('ORDER ID MUST BE A VALID INTEGER'),
]

routes.post('/',AuthMiddleware.authenticateToken,validateOrder,validate,OrderController.createOrder);
routes.get('/:id',AuthMiddleware.authenticateToken,ValidateOrderId,validate,OrderController.getOrderById);
routes.get(
    '/user/:userId',
    AuthMiddleware.authenticateToken,
    [param('userId').isInt().withMessage('USER ID MUST BE A VALID INTEGER')],
    validate,
    OrderController.getOrderByUserId
);
routes.delete('/:id',AuthMiddleware.authenticateToken,ValidateOrderId,validate,OrderController.deleteOrder);

module.exports=routes;