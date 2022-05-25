const router = require("express").Router();
const {verifyTokenAndAdmin} = require("./verifyToken")
const Product = require("../models/Product")


//Add Product
router.post("/", async (req,res) => {
    const newProduct = new Product(req.body);
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//Update Product
router.put("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        const updatedProduct =await Product.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json("Error occured! Unable to update product.")
    }
})

//Delete Product
router.delete("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted...");
    }catch(err){
        res.status(500).json(err);
    }
})


//Get Product
router.get("/find/:id", async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports = router;