const router = require("express").Router();
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken")
const Order = require("../models/Order")


//Add Order
router.post("/",verifyTokenAndAuthorization, async (req,res) => {
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})

//Update Order
router.put("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        const updatedOrder =await Order.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json("Error occured! Unable to update Order.")
    }
})

//Delete Order
router.delete("/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order deleted...");
    }catch(err){
        res.status(500).json(err);
    }
})


//Get User Orders
router.get("/find/:userId", async (req,res) => {
    try{
        const orders = await Order.find({userId:req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports = router;