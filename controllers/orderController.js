const OrderService=require('../services/orderService');


exports.createOrder=async(req,res)=>{
    console.log("CREATE ORDER CONTOLLER");
    try {

        const userId=req.body.userId;
        const items=req.body.items;

        const orderId=await OrderService.createOrder(userId,items);
        res.status(201).json({message:'ORDER CREATED SUCCESSFULLY',orderId});
        
    } catch (err) {
        res.status(400).json({message:err.message});
    }
}

exports.getOrderById=async(req,res)=>{
    console.log('GET ORDER BY ID CONTROLLER');
    try {
        const ID=req.params.id;

        const order=await OrderService.getOrderById(ID) 
        res.json(order);
        
    } catch (err) {
        res.status(404).json({message:err.message})
    }
}

exports.getOrderByUserId=async(req,res)=>{
    console.log('GET ORDER BY USER ID CONTROLLER');
    try {
        const userId=req.params.userId
        const orders=await OrderService.getOrderByUserId(userId);
        res.json(orders)
        
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}

exports.deleteOrder=async(req,res)=>{
    console.log("DELETE ORDER CONTROLLER");
    try {
        const ID=req.params.id;
        const deleted=await OrderService.deleteOrder(ID);
        res.json({message:'ORDER DELETED SUCCESSFULLY',deleted})
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}