import express from "express"
import Istighfar from "../models/Istighfar.js";
import Prayer from '../models/Salat.js';
import { format } from 'date-fns';
const router = express.Router()

// router.post("/get", async (req, res) => {
//     const { id, type } = req.body;
    
//         if (!id) {
//         return res.status(400).json({ message: "User ID is required" });
//         }
    
//         try {
//         let istighfar;
    
//         if (type) {
//             istighfar = await Istighfar.find({ userId: id, type });
//         } else {
//             istighfar = await Istighfar.find({ userId: id, type: { $ne: "Istighfar" } });
//         }
    
//         if (!payments.length) {
//             return res.status(403).json({
//             message: "No Istighfar found",
//             payments: [],
//             success: false,
//             });
//         }
    
//         return res.status(200).json({
//             message: "Payments fetched successfully",
//             payments,
//             success: true,
//         });
//         } catch (error) {
//         console.error("Error fetching payments:", error);
//         return res.status(500).json({ message: "Error fetching payments", error });
//         }
//     });
    
router.post("/getIstighfar", async (req, res) => {
    const { id } = req.body;
    console.log(id);
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
      const istighfars = await Istighfar.find({ userId: id, type:"Istighfar" }); // Filter by type
        if (!istighfars.length) {
            return res.status(403).json({
            message: "No earnings found",
            istighfars: [],
            success: false,
            });
        }
    
        return res.status(200).json({
            message: "Istighfars fetched successfully",
            istighfars,
            success: true,
        });
        } catch (error) {
        console.error("Error fetching Istighfars:", error);
        return res.status(500).json({ message: "Error fetching Istighfars", error });
        }
    });

router.post("/create",async(req,res)=>{
    const {id, istighfar} = req.body
    console.log(id, istighfar)
    if(!id){
        return res.status(401).json({message:"id is required"})
    }
    if(!istighfar){
        return res.status(400).json({message:"istighfar is required"})
    }
    try {
        const istighfars = Istighfar.create({
            userId:id,
            amount:istighfar.amount,
            title:istighfar.title,
            date:istighfar.date,
            type:istighfar.type,
        })
        if(!istighfars){
            return res.status(400).json({message:"istighfar not created", success:false})
        }
        return res.status(200).json({message:"istighfar created", success:true, data:istighfars})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal server error", success:false})
    }
});

router.post("/get",async (req, res) => {
    try {
        const { userId } = req.body; // Assuming you have auth middleware
        console.log("hooo",userId)
        if(!userId) {
            return res.status(401).json({ message: "User ID is required" });
        }
        const date = format(new Date(), 'yyyy-MM-dd');
        let prayer = await Prayer.findOne({ userId, date });
        if (!prayer) {
        // Create new prayer record for today if it doesn't exist
        prayer = await Prayer.create({
            userId,
            date,
            prayers: {
            fajr: false,
            dhur: false,
            asr: false,
            maghrib: false,
            isha: false,
            }
        });
        }
        console.log(prayer)

    res.status(200).json({ success: true, data: prayer });
    } catch (error) {
        console.error('Error in getPrayers:', error);
        res.status(500).json({ success: false, error: 'Error fetching prayers' });
    }
}) 

// Toggle prayer status
router.patch("/toggle", async (req, res) => {
    const {userId,name } = req.body;
    console.log(userId,name )
    if(!userId, !name){
        return res.status(400).json({message:"invalid request", success:false})
    }
try {

    const date = format(new Date(), 'yyyy-MM-dd');

    // Find existing prayer record or create new one
    let prayer = await Prayer.findOne({ userId, date });

    if (!prayer) {
        prayer = await Prayer.create({
            userId,
            date,
            prayers: {
            fajr: false,
            dhur: false,
            asr: false,
            maghrib: false,
            isha: false,
            }
        });
    }

    // Toggle the specified prayer
    prayer.prayers[name] = !prayer.prayers[name];
    await prayer.save();

    res.status(200).json({ success: true, data: prayer });
    } catch (error) {
        console.error('Error in togglePrayer:', error);
        res.status(500).json({ success: false, error: 'Error updating prayer status' });
    }
});
export default router;
