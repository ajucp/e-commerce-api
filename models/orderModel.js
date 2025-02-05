const db=require('../config/db');

const createOrder=async(userId,totalAmount,status='pending')=>{
    const query=`
        INSERT INTO orders(user_id,total_amount,status,created_at,updated_at)
        VALUES (?,?,?,NOW(),NOW())
    `;

    const [result]=await db.execute(query,[userId,totalAmount,status]);
    return result.insertId;
}

const addOrderItem=async(orderId,productId,quantity,price)=>{
    const query=`
        INSERT INTO order_items(order_id,product_id,quantity,price)
        VALUES(?,?,?,?)
    `;
    const [result]=await db.execute(query,[orderId,productId,quantity,price]);

    return result.insertId;
}

const getExistingProducts=async(productIds)=>{
    if (productIds.length===0)return [];

    const placeholders=productIds.map(()=>'?').join(',');

    const query=`SELECT id FROM products WHERE id IN (${placeholders})`;

    const [rows]=await db.execute(query,productIds);
    return rows;
}

const getOrderById=async(orderId)=>{
    const query=`
        SELECT o.id,o.total_amount,o.status,o.created_at,o.updated_at,
            oi.product_id,oi.quantity,oi.price
        FROM orders o
        JOIN order_items oi ON o.id=oi.order_id
        WHERE o.id=?
    `;
    const [rows]=await db.execute(query,[orderId]);
    return rows;
}

const getOrderByUserId=async(userId)=>{
    const query=`
        SELECT id,total_amount,status,created_at,updated_at
        FROM orders
        WHERE user_id=?
        ORDER BY created_at DESC
    `;
    const [rows]=await db.execute(query,[userId]);
    return rows;

}

const deleteOrder=async(orderId)=>{
    // delete  Related order items first
    await deleteOrderItems(orderId);

    const query='DELETE FROM orders WHERE id=?';
    const [result]=await db.execute(query,[orderId]);

    if(result.affectedRows===0)throw new Error("ORDER NOT FOUND");
    

    return result.affectedRows;
}

const deleteOrderItems=async(orderId)=>{
    const query='DELETE FROM order_items WHERE order_id=?';

    await db.execute(query,[orderId]);
}


module.exports={createOrder,addOrderItem,getExistingProducts,getOrderById,getOrderByUserId,deleteOrder,deleteOrderItems}