import express from "express"
import Payment from "../models/Payment.js";

const router = express.Router()

router.post("/get", async (req, res) => {
    const { id, type } = req.body;

    if (!id || !type) {
        return res.status(400).json({ message: "User ID and type are required" });
    }
    try {
        const earnings = await Payment.find({ userId: id, type:type });
        if (!earnings.length) {
            return res.status(401).json({ message: "No earnings found", earnings: [], success: false });
        }
        return res.status(200).json({
            message: "Earnings fetched successfully",
            earnings,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching earnings:", error);
        return res.status(500).json({ message: "Error fetching earnings", error });
    }
});


router.delete("/delete");
router.patch("/update");
router.post("/create",async(req,res)=>{
    const {id, payment} = req.body

    if(!id){
        return res.status(400).json({message:"id is required"})
    }
    if(!payment){
        return res.status(400).json({message:"payment is required"})
    }
    try {
        const payments = Payment.create({
            userId:id,
            amount:payment.amount,
            title:payment.title,
            date:payment.date,
            type:payment.type,
            completed:payment.completed
        })
        if(!payments){
            return res.status(400).json({message:"payment not created", success:false})
        }
        return res.status(200).json({message:"payment created", success:true, data:payments})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal server error", success:false})
    }
});

export default router;
