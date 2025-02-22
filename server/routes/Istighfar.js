import express from "express"
import Istighfar from "../models/Istighfar.js";
import Prayer from '../models/Salat.js';
import { format } from 'date-fns';
import Adkar from "../models/Adkar.js";
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

router.post("/get", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const today = format(new Date(), 'yyyy-MM-dd');

        // Check if the user has a prayer record for today
        let prayer = await Prayer.findOne({ userId });

        if (!prayer) {
            // No record at all, create a new one
            prayer = await Prayer.create({
                userId,
                date: today,
                prayers: { fajr: false, dhur: false, asr: false, maghrib: false, isha: false }
            });
        } else if (prayer.date !== today) {
            // User has a record, but it's outdated—update the date and reset prayers
            prayer.date = today;
            prayer.prayers = { fajr: false, dhur: false, asr: false, maghrib: false, isha: false };
            await prayer.save();
        }

        res.status(200).json({ success: true, data: prayer });
    } catch (error) {
        console.error("Error in getPrayers:", error);
        res.status(500).json({ success: false, error: "Error fetching prayers", details: error.message });
    }
});
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

//
router.post("/dikr",async(req, res)=>{
    const {userId} = req.body;
    try {
        // Try to find existing settings for the user
        let userAdkar = await Adkar.findOne({ userId });
        
        // If no settings found, create default settings for all adkar
        if (!userAdkar) {
            const defaultAdkar = [
                { name: "لا حَوْلَ ولا قوَّةَ إلَّا باللهِ.", startTime: "08:00", endTime: "20:00", interval: "60" },
                { name: "الحَمْدُ للهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ.", startTime: "08:00", endTime: "20:00", interval: "60" },
                { name: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنْ الظَّالِمِين.", startTime: "08:00", endTime: "20:00", interval: "60" },
                { name: "سُبْحَانَ اللَّهِ، الْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ، اللَّهُ أَكْبَرُ.", startTime: "08:00", endTime: "20:00", interval: "60" },
                { name: "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ", startTime: "08:00", endTime: "20:00", interval: "60" },
                { name: "سبحان الله و بحمده عدد خلقه ورضا نفسه وزنة عرشه ومداد كلماته", startTime: "08:00", endTime: "20:00", interval: "60" },
                { name: "لا إلَهَ إلَّا اللهُ وحْدَهُ لا شَرِيكَ له، له المُلْكُ وله الحَمْدُ، وهو علَى كُلِّ شيءٍ قَدِيرٌ.", startTime: "08:00", endTime: "20:00", interval: "60" },
                { name: "اللهمَّ صلِّ على محمَّد وعلى آل محمَّد، كما صليتَ على إبراهيم وعلى آل إبراهيم، إنَّك حميد مجيد.", startTime: "08:00", endTime: "20:00", interval: "60" }
          ];
          
          userAdkar = new Adkar({
            userId,
            adkar: defaultAdkar
        });

        await userAdkar.save();
        }
        
        res.json({success:true,data:userAdkar});
      } catch (error) {
        console.error('Error fetching/creating Adkar settings:', error.message);
        res.status(500).json({ message: 'Server error while fetching/creating Adkar settings' });
      }
})
router.patch('/updateDikr', async (req, res) => {
    console.log(req.body);
    const { userId, index, startTime, endTime, interval } = req.body;
    console.log(userId, index, startTime, endTime, interval);

    try {
        if (!userId || index === undefined || !startTime || !endTime || interval === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (isNaN(index) || index < 0 || index > 7) {
            return res.status(400).json({ message: 'Invalid dikr index' });
        }

        // Validate time format (HH:MM)
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return res.status(400).json({ message: 'Invalid time format. Use HH:MM' });
        }

        const intervalParsed = parseInt(interval);
        if (isNaN(intervalParsed) || intervalParsed <= 0) {
            return res.status(400).json({ message: 'Invalid interval value' });
        }

        // Find user's Adkar document
        let userAdkar = await Adkar.findOne({ userId });

        if (!userAdkar) {
            return res.status(404).json({ message: 'Adkar settings not found' });
        }

        // Ensure adkar array exists
        if (!Array.isArray(userAdkar.adkar) || userAdkar.adkar.length <= index) {
            return res.status(400).json({ message: 'Invalid adkar structure or index out of bounds' });
        }

        // Update the specific adkar settings (Store time as a string)
        userAdkar.adkar[index].startTime = startTime; // Keep as "HH:MM"
        userAdkar.adkar[index].endTime = endTime; // Keep as "HH:MM"
        userAdkar.adkar[index].interval = intervalParsed;

        await userAdkar.save();

        res.json({ message: 'Adkar settings updated successfully', userAdkar });
    } catch (error) {
        console.error('Error updating Adkar setting:', error);
        res.status(500).json({ message: 'Server error while updating Adkar setting' });
    }
});


export default router;
