import express from "express"
import Analyse from "../models/Analyse.js"

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        const newAnalyse = new Analyse(req.body)

        await newAnalyse.save()

        res.status(201).json({ 
            success: true, 
            data: newAnalyse,
            message: "Analyse created successfully"
        })
    } catch (error) {
        console.error("Error creating analyse:", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
})

export default router
