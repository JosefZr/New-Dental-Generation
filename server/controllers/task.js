import Task from "../models/Task.js";

const createUserTask =async (req, res) => {

    const { id, task } = req.body;
    if (!id || !task) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    try {
        const response = await Task.create({
            userId: id,
            title: task.title,
            description: task.description,
            duration:task.duration,
            startDate: task.startDate,
            startTime: task.startTime,
            repeatDays: task.repeatDays,
            category: task.category,
        });

        if (!response) {
            return res.status(200).json({ message: "Task not created." });
        }

        return res.status(201).json({
            message: "Task created successfully",
            data: response,
            success: true,
        });
    } catch (error) {
        console.error("Error while creating task:", error); // Log error here
        return res.status(500).json({ message: "Internal server error", error });
    }
}
const getAllTasks = async(req, res)=>{
        const { id,category } = req.body;
        console.log("zbu",category)
        if (!id || !category) {
            return res.status(400).json({ message: "User ID is required" });
        }
        try {
            const tasks = await Task.find({ userId:id,category:category });
            if (!tasks) {
                return res.status(404).json({ message: "No tasks found", tasks: [], success: false });
            }
            return res.status(200).json({
                message: "Tasks fetched successfully",
                tasks: tasks,
                success: true,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching tasks", error });
        }
}
const getAllInventoryTasks = async(req, res)=>{
    const { id,category } = req.body;
    console.log("assust",category)
    if (!id || !category) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const tasks = await Task.find({ userId:id,category:category });
        if (!tasks) {
            return res.status(404).json({ message: "No tasks found", tasks: [], success: false });
        }
        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks: tasks,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching tasks", error });
    }
}
const getAllSimpleTasks = async(req, res)=>{
    const { id,category } = req.body;
    console.log("asssss",category)
    if (!id || !category) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const tasks = await Task.find({ userId:id,category:category });
        if (!tasks) {
            return res.status(404).json({ message: "No tasks found", tasks: [], success: false });
        }
        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks: tasks,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching tasks", error });
    }
}
export {
    createUserTask,
    getAllTasks,
    getAllInventoryTasks,
    getAllSimpleTasks
}