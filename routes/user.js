const router = require("express").Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const User = require("../models/User");
const { markAsUntransferable } = require("worker_threads");

router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try{
        const updatedUser =await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json("Error occured! Unable to update.")
    }
})

//Delete particular user
router.delete("/:id", verifyTokenAndAuthorization, async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted...");
    }catch(err){
        res.status(500).json(err);
    }
})

//Get particular user
router.get("/find/:id", verifyTokenAndAdmin, async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get all users
router.get("/", verifyTokenAndAdmin, async (req,res) => {
    try{
        const users = await User.find();
        const usersWithoutPassword = users.map((user) => {
            const {password, ...others} = user._doc;
            return others;
        })
        res.status(200).json(usersWithoutPassword);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;