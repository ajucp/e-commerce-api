const Order=require('../models/orderModel')

const createOrder=async(userId,items)=>{
    let totalAmount=0;

    //extract productid
    const productIds=items.map(item=>item.productId);

    //checking the productid exist
    const existingProducts=await Order.getExistingProducts(productIds);

    //convert the result to a set for easy lookup
    const existingProductIds=new Set(existingProducts.map(product =>product.id));

    //find missing product

    const missingProducts=productIds.filter(id=>!existingProductIds.has(id));

    if(missingProducts.length>0){
        throw new Error(`PRODUCT ID ${missingProducts.join(',')} NOT FOUND!!`);
        
    }

    //for total amount
    items.forEach(item => {
        totalAmount +=item.price *item.quantity
    });

    //to create order
    const orderId=await Order.createOrder(userId,totalAmount);

    //add items to the order
    for (const item of items){
        await Order.addOrderItem(orderId,item.productId,item.quantity,item.price);

    }
    return orderId;
}

const getOrderById=async(orderId)=>{
    const order=await Order.getOrderById(orderId);

    if(!order.length)throw new Error("ORDER NOT FOUND");
    return order
    
}

const getOrderByUserId=async(userId)=>{
    return await Order.getOrderByUserId(userId);
}

const deleteOrder=async(orderId)=>{
    const deleted=await Order.deleteOrder(orderId);
    if(deleted===0)throw new Error("ORDER NOT FOUND");
    return deleted;
    
}

module.exports={createOrder,getOrderById,getOrderByUserId,deleteOrder}