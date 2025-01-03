import express from "express";
import { createUserTask, getAllTasks,getAllInventoryTasks } from "../controllers/task.js";
import Task from "../models/Task.js";

const router = express.Router();

// Your other routes here
router.post("/create", createUserTask);
router.post("/get", getAllTasks);
router.post("/getInventory",getAllInventoryTasks)
// PATCH route to mark task as complete
router.patch("/check", async (req, res) => {
    const { userId, id,completed } = req.body;
    console.log(req.body)
    if (!userId || !id) {
        return res.status(401).json({ message: " IDs are required" });
    }

    try {
        const task = await Task.findOneAndUpdate(
            { userId: userId, _id: id },
            { completed: completed },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task checked successfully",
            task,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating task", error });
    }
});

router.delete("/delete", async (req, res) => {
    const { userId, id } = req.body;
    console.log(req.body)
    if (!userId || !id) {
        return res.status(401).json({ message: " IDs are required" });
    }

    try {
        const task = await Task.findByIdAndDelete(
            { userId: userId, _id: id },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task checked successfully",
            task,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating task", error });
    }
});

router.patch("/update",async(req, res)=>{
    const {id,taskId, task} = req.body;
    console.log(id,taskId, task)
    if (!id || !taskId) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (!task){
        return res.status(400).json({ message: "the task ist there" });
    }
    try {
        const response = await Task.findByIdAndUpdate(
            { _id: taskId },
            {
            userId: id,
            title: task.title,
            description: task.description,
            duration:task.duration,
            startDate: task.startDate,
            startTime: task.startTime,
            repeatDays: task.repeatDays,
            category: task.category,
        },
        { new: true }
    );
    if (!response) {
        return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({
        message: "Task updated successfully",
        data:response,
        success: true,
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error updating task", error });
    }
})
export default router;
