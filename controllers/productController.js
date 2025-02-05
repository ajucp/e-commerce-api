const ProductService=require('../services/productService')

exports.getAllProducts=async(req,res)=>{
    console.log('GET ALL PRODUCTS CONTROLLER')
    try {
        const products=await ProductService.getAllProducts();
        console.log('ALL PRODUCTS: ',products)
        res.json(products)
        
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

exports.getProductById=async(req,res)=>{
    console.log('GET PRODUCTS BY ID CONTOLLER')
    try {
        const prodId=req.params.id;
        console.log(prodId);
        const product=await ProductService.getProdById(prodId);
        console.log('PRODUCT',product);
        res.json(product);
    } catch (err) {
        res.status(404).json({message:err.message});
    }
}

exports.createProduct=async(req,res)=>{
    console.log('CREATE PRODUCTS CONTOLLER')
    try {
        const product=req.body;
        console.log('CREATED PRODUCT: ',product)
        const productId=await ProductService.createProd(product);
        res.json(productId);
        
    } catch (err) {
        res.status(400).json({message:err.message});
    }
}

exports.updateProduct=async(req,res)=>{
    console.log('UPDATE PRODUCT CONTOLLER')
    try {
        const prodId=req.params.id;
        const product=req.body;
        const updatedProd=await ProductService.updateProd(prodId,product);
        console.log('UPDATED PRODUCT: ',updatedProd);
        res.json({message:'PRODUCT UPDATED SUCCESSFULLY',
            udpatedProduct:updatedProd
        })
    } catch (err) {
      res.status(404).json({message:err.message})  
    }
}

exports.deleteProduct=async(req,res)=>{
    console.log('DELETE PRODUCTS CONTOLLER')

    try {
        const prodId=req.params.id;
        console.log(prodId)
        const deleted=await ProductService.deleteProd(prodId)
        res.json({message:"PRODUCT DELETED SUCCESSFULLY",
            deletedProduct:deleted
        })
    } catch (err) {
        res.status(404).json({message:err.message})
    }
}