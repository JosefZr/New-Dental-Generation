import express from "express"
import Payment from "../models/Payment.js";

const router = express.Router()

router.post("/get", async (req, res) => {
    const { id, type } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      let payments;
  
      // If a type is provided, get payments matching the type.
      if (type) {
        payments = await Payment.find({ userId: id, type });
      } else {
        // If type is not provided, get payments where type is NOT "Earnings".
        payments = await Payment.find({ userId: id, type: { $ne: "Earnings" } });
      }
  
      if (!payments.length) {
        return res.status(403).json({
          message: "No payments found",
          payments: [],
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Payments fetched successfully",
        payments,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching payments:", error);
      return res.status(500).json({ message: "Error fetching payments", error });
    }
  });
  router.post("/getEarnings", async (req, res) => {
    const { id } = req.body;
    console.log(id);
  
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

  
    try {
      // If type is not provided, get payments where type is NOT "Earnings".
      const earnings = await Payment.find({ userId: id, type:"Earnings" }); // Filter by type
      if (!earnings.length) {
        return res.status(403).json({
          message: "No earnings found",
          earnings: [],
          success: false,
        });
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
  

router.delete("/delete",async(req, res)=>{
  const { userId, id } = req.body;
  console.log(id);
  if (!userId || !id) {
    return res.status(401).json({ message: " IDs are required" });
  }
  try {
    const payment = await Payment.findByIdAndDelete(
        { userId: userId, _id: id },
        { new: true }
    );

    if (!payment) {
        return res.status(404).json({ message: "payment not found" });
    }

    return res.status(200).json({
        message: "payment deleted successfully",
        payment,
        success: true,
    });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error deleting payment", error });
  }
});
router.patch("/update",async(req,res)=>{
  const {id,taskId, task} = req.body;
  if (!id || !taskId) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }
  if (!task){
      return res.status(400).json({ message: "the payment ist there" });
  }
  try {
    const response = await Payment.findByIdAndUpdate(
        { _id: taskId },
        {
        userId: id,
        title: task.title,
        amount: task.amount,
        completed:task.completed,
        date: task.date,
        
    },
    { new: true }
  );
  if (!response) {
      return res.status(404).json({ message: "payment not found" });
  }
  return res.status(200).json({
      message: "Task updated successfully",
      payment:response,
      success: true,
  })
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error updating payment", error });
  }
});
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
router.patch("/check", async (req, res) => {
    const { userId, id,completed } = req.body;
    console.log(req.body)
    if (!userId || !id) {
        return res.status(401).json({ message: " IDs are required" });
    }

    try {
        const task = await Payment.findOneAndUpdate(
            { userId: userId, _id: id },
            { completed: completed },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "payment not found" });
        }

        return res.status(200).json({
            message: "payment checked successfully",
            task,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating payment", error });
    }
});
export default router;
