const router = require("express").Router();

const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken")
const Cart = require("../models/Cart")


//Create Cart
router.post("/",verifyTokenAndAuthorization, async (req,res) => {
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})

//Update Cart
router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {
    try{
        const updatedCart =await Cart.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json("Error occured! Unable to update product.")
    }
})

//Delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req,res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted...");
    }catch(err){
        res.status(500).json(err);
    }
})


//Get User Cart
router.get("/find/:userId",verifyTokenAndAuthorization ,async (req,res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get All Carts
router.get("/find",verifyTokenAndAdmin ,async (req,res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})




module.exports = router;

module.exports = router;