import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

router.post("/getSettings", async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        let settings = await Settings.findOne({ userId });

        if (!settings) {
            settings = await Settings.create({ userId });
            return res.status(201).json({
                message: "Settings created successfully",
                settings,
                success: true,
            });
        } else {
            return res.status(200).json({
                message: "Settings found successfully",
                settings,
                success: true,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
});

router.patch("/goal", async (req, res) => {
    const { userId, goal } = req.body;
    if (!userId || !goal) {
        return res.status(400).json({ message: "User ID and Goal are required" });
    }

    try {
        const updatedGoal = await Settings.findOneAndUpdate(
            { userId },
            { goal },
            { new: true }
        );

        if (!updatedGoal) {
            return res.status(404).json({ message: "Settings not found", success: false });
        }

        return res.status(200).json({
            message: "Goal updated successfully",
            updatedGoal,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating goal", error });
    }
});
router.patch("/IstighfarGoal", async (req, res) => {
    const { userId, goal } = req.body;
    if (!userId || !goal) {
        return res.status(400).json({ message: "User ID and Istighfar Goal are required" });
    }

    try {
        const updatedGoal = await Settings.findOneAndUpdate(
            { userId },
            { IstighfarGoal:goal },
            { new: true }
        );

        if (!updatedGoal) {
            return res.status(404).json({ message: "Settings not found", success: false });
        }

        return res.status(200).json({
            message: "Istighfar Goal updated successfully",
            updatedGoal,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating Istighfar Goal", error });
    }
});
router.patch("/currency", async (req, res) => {
    const { userId, currency } = req.body; // Fixed typo

    if (!userId || !currency) {
        return res.status(400).json({ message: "User ID and Currency are required" });
    }

    try {
        const updatedCurrency = await Settings.findOneAndUpdate(
            { userId },
            { currency },
            { new: true }
        );

        if (!updatedCurrency) {
            return res.status(404).json({ message: "Settings not found", success: false });
        }

        return res.status(200).json({
            message: "Currency updated successfully",
            updatedCurrency,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating currency", error });
    }
});

export default router;
