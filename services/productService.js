const Product=require('../models/productModel')


const getAllProducts=async()=>{
    return await Product.getAllProducts();
}

const getProdById=async(id)=>{

    const product=await Product.getProductByid(id);

    if(!product) throw new Error("PRODUCT NOT FOUND");
    return product;
    
}

const createProd=async(product)=>{

    const {name,description,price,stock}=product;

    return await Product.createProduct(name,description,price,stock);
}

const updateProd=async(id,product)=>{

    const {name,description,price,stock}=product;
    const updated=await Product.updateProduct(id,name,description,price,stock);

    if(updated===0) {
        const existingProduct=await Product.getProductByid(id);
        if(!existingProduct) throw new Error("PRODUCT NOT FOUND");
        throw new Error("NO CHANGES MADE");
        
    }

    return updated
    
}
const deleteProd=async(id)=>{
    const deleted=await Product.deleteProduct(id);
    if(deleted===0) throw new Error("PRODUCT NOT FOUND");
    return deleted;
    
}


module.exports={getAllProducts,getProdById,createProd,updateProd,deleteProd}