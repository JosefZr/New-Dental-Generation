import express from "express"
import Quoates from "../models/Quotes.js";

const router = express.Router();

router.post("/create",async (req, res)=>{
    const {text} = req.body
    if(!text){
        return res.status(400).json({message: "Please enter the quote."})
    }
    try {
        const response = await Quoates.create({
            text:text
        })
        if(!response){
            return res.status(400).json({message:"Failed to create quote"})
        }
        return res.status(201).json({message:"quote created successfully",data:response, success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error:error,success:false})
    }
})
router.patch("/update",async (req, res)=>{
    const {id, text} = req.body
    if(!id){
        return res.status(400).json({message: "Please enter the quote id."})
    }
    try {
        const response = await Quoates.findByIdAndUpdate({_id:id},{text:text},{new:true})
        if(!response){
            return res.status(400).json({message:"Failed to update quote"})
        }
        return res.status(200).json({message:"quote updated successfully",data:response, success:true})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error",error:error,success:false})
    }
})
router.delete("/delete",async(req, res)=>{
    const {id}= req.body
    if(!id){
        return res.status(400).json({message: "Please enter the id of the quote"})
    }
    try {
        const response = await Quoates.deleteOne({ _id: id })
        if(!response){
            return res.status(400).json({message:"Failed to delete quote"})
        }
        return res.status(200).json({message:"text deleted successfully",data:response, success:true})
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
        const response = await Quoates.find({})
        if(!response){
            return res.status(404).json({message: "No quotes found"})
        }
        return res.status(201).json({
            message: " quotes found",
            data: response,
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error", error: error.message})
    }
})
router.get('/random', async (req, res) => {
    try {
        const count = await Quoates.countDocuments();
        const random = Math.floor(Math.random() * count);
        const randomQuote = await Quoates.findOne().skip(random);
        return res.status(201).json({
            message: " quotes generated",
            data: randomQuote,
            success:true
        })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching random quote', error });
    }
});
export default router
