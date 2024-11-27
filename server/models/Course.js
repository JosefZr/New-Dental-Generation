import moongoose from "mongoose"
const LectureSchema = new moongoose.Schema({
    title:String,
    videoUrl:String,
    freePreview:Boolean
})
const courseSchema = new moongoose.Schema({
    instructorId:String,
    instructorName : String,
    date: Date,
    title: String,
    level:String,
    primaryLanguage:String,
    subtitle:String,
    description:String,
    image:String,
    welcomeMessage:String,
    students:[
        {
            studentId:String,
            studentName:String,
            studentEmail:String
        }
    ],
    curriculum:[LectureSchema],
    isPublished:Boolean
});

export default moongoose.model('Course', courseSchema)