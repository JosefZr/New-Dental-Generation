import mongoose from "mongoose";

const LectureProgressSchema = new mongoose.Schema({
    lectureId: String,
    viewed: Boolean,
    dateViewed: Date
  });
  
  const ModuleProgressSchema = new mongoose.Schema({
    moduleId: String,
    completed: Boolean,
    lectures: [LectureProgressSchema]
  });
  
  const CourseProgressSchema = new mongoose.Schema({
    userId: String,
    courseId: String,
    completed: Boolean,
    completionDate: Date,
    isFavorite: {
      type: Boolean,
      default: false
    },
    moduleProgress: [ModuleProgressSchema] // Changed from lectureProgress to moduleProgress
  });
  
  const CourseProgress = mongoose.model('Progress', CourseProgressSchema);
  export default CourseProgress;