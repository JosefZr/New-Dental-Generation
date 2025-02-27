import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
    title: String,
    descriptionTitle: String,
    description:String,
    videoUrl: String,
    freePreview: Boolean
});
const SubModuleSchema = new mongoose.Schema({
    title: String,
    lectures: [LectureSchema]
});
const ModuleSchema = new mongoose.Schema({
    title: String,
    subModules: [SubModuleSchema]
});

const courseSchema = new mongoose.Schema({
    instructorId: String,
    instructorName: String,
    date: Date,
    title: String,
    level: String,
    primaryLanguage: String,
    subtitle: String,
    description: String,
    image: String,
    welcomeMessage: String,
    students: [
        {
            studentId: String,
            studentName: String,
            studentEmail: String
        }
    ],
    modules: [ModuleSchema], // Array of modules containing lectures
    isPublished: Boolean
});

export default mongoose.model('Course', courseSchema);
