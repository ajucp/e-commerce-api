const express=require('express');
const {body,param}=require('express-validator');
const UserController=require('../controllers/userController');
const AuthMiddleware=require('../middleware/authMiddleware')
const validate = require('../middleware/errorHandler');
const routes=express.Router();

const validateuserRegistration=[
    body('username').notEmpty().withMessage('USERNAME IS REQUIRED'),
    body('password').isLength({min:6}).withMessage('PASSWORD MUST BE AT LEAST 6 CHARACTERS LONG'),
    body('email').isEmail().withMessage('INVALID EMAIL ADDRESS'),
    body('address').notEmpty().withMessage('ADDRESS IS REQUIRED')
];

const validateUserId=[
    param('id').isInt().withMessage('USER ID MUST BE A VALID INTEGER'),
];

routes.post('/register',validateuserRegistration,validate,UserController.register);
routes.post('/login',[body('username').notEmpty(),body('password').notEmpty()],validate,UserController.login);
routes.get('/:id',AuthMiddleware.authenticateToken,validateUserId,validate,UserController.getUser);
routes.put('/:id',AuthMiddleware.authenticateToken,validateUserId,validate,UserController.updateUser);

module.exports=routes;