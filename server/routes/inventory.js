import express from "express"
import Inventory from "../models/dentalInventory.js";

const router = express.Router();

router.post("/create",async (req, res)=>{
    const {inventory} = req.body
    if(!inventory){
        return res.status(400).json({message: "Please enter the inventory details."})
    }
    try {
        const response = await Inventory.create({
            name:inventory
        })
        if(!response){
            return res.status(400).json({message:"Failed to create inventory"})
        }
        return res.status(201).json({message:"Inventory created successfully",data:response, success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error:error,success:false})
    }
})
router.patch("/update",async (req, res)=>{
    const {id, name} = req.body
    if(!id){
        return res.status(400).json({message: "Please enter the inventory id."})
    }
    try {
        const response = await Inventory.findByIdAndUpdate({_id:id},{name:name},{new:true})
        if(!response){
            return res.status(400).json({message:"Failed to update inventory"})
        }
        return res.status(200).json({message:"Inventory updated successfully",data:response, success:true})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error:error,success:false})
    }
})
router.delete("/delete",async(req, res)=>{
    const {id}= req.body
    if(!id){
        return res.status(400).json({message: "Please enter the id of the inventory to"})
    }
    try {
        const response = await Inventory.deleteOne({ _id: id })
        if(!response){
            return res.status(400).json({message:"Failed to delete inventory"})
        }
        return res.status(200).json({message:"Inventory deleted successfully",data:response, success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            error: error,
        })
    }
})
router.get("/getAll",async(req, res)=>{
    try {
        const response = await Inventory.find({})
        if(!response){
            return res.status(404).json({message: "No data found"})
        }
        return res.status(201).json({
            message: " data found",
            data: response,
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error", error: error.message})
    }
})

export default router
