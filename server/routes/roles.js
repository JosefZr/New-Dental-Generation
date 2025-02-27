import express from "express";
import User from "../models/User.js";
const router = express.Router()

router.post("/get",async(req,res)=>{
    const {userId} = req.body
    if(!userId){
        return res.status(400).json({message:"Please provide user id", success:false})
    }
    try {
        const data = await User.findById(userId).select("moreRole");
        if(!data){
            return res.status(404).json({message:"User not found", success:false})

        }
        return res.status(200).json({
            message:"User found successfully",
            success:true,
            data:data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error", success:false})
    }
})
router.patch("/add",async(req, res)=>{
    const {userId, role} = req.body
    console.log(userId, role)
    if(!userId || !role){
        return res.status(400).json({message:"Please provide user id and moreRole", success:false})
    }
    try {
        const user = await User.findByIdAndUpdate(userId, { $push: { moreRole: {name:role} } },
            { new: true }
            );
            if(!user){
                return res.status(404).json({message:"User not found", success:false})
            }
            return res.status(200).json({
                message:"Role added successfully",
                success:true,
                data:user
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error", success:false})
    }
})
router.post("/delete", async(req, res) => {
    const {userId, role} = req.body;
    if(!userId || !role){
        return res.status(400).json({message:"Please provide user id and moreRole", success:false});
    }
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { moreRole: { name: role } } },
            { new: true }
        );
        
        if(!user){
            return res.status(404).json({message:"User not found", success:false});
        }
        
        return res.status(200).json({
            message:"Role removed successfully",
            success:true,
            data:user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error", success:false});
    }
});
export default router;
