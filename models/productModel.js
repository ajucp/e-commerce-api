const db=require('../config/db');

const getAllProducts=async()=>{

    const query='SELECT * FROM products';
    const [allProducts]=await db.execute(query);
    return allProducts;
}

const getProductByid=async(id)=>{

    const query='SELECT * FROM products WHERE id=?';
    const [product]=await db.execute(query,[id]);
    return product[0]
}

const createProduct=async(name,description,price,stock)=>{

    const query=`INSERT INTO products (name,description,price,stock,created_at,updated_at)VALUES(?,?,?,?,NOW(),NOW())`;

    const [result]=await db.execute(query,[name,description,price,stock]);
    return result;
}

const updateProduct=async(id,name,description,price,stock)=>{
    const query=`UPDATE products SET 
                name =?,
                description=?,
                price=?,
                stock=?,
                updated_at=NOW()
                WHERE id=? `;
    const [result]=await db.execute(query,[name,description,price,stock,id]);
    return result.affectedRows;
}

const deleteProduct=async(id)=>{
    const query='DELETE FROM products WHERE id=?';
    const [result]=await db.execute(query,[id]);
    return result.affectedRows;
}

module.exports={getAllProducts,getProductByid,createProduct,updateProduct,deleteProduct};