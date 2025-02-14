import express from "express"
import Job from "../models/Job.js"

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        const newJob = new Job(req.body)

        await newJob.save()

        res.status(201).json({ 
            success: true, 
            data: newJob,
            message: "Job created successfully"
        })
    } catch (error) {
        console.error("Error creating Job:", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
})
router.get("/get",async(req, res)=>{
    try {
        const jobs = await Job.find()
        res.status(200).json({
            success: true,
            data: jobs,
            message: "Jobs retrieved successfully"
        })
    } catch (error) {
        console.error("Error retrieving Jobs:", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
})
export default router
