import { useContext, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import CourseCurriculum from "../components/instructor/courses/add-new-course/CourseCurriculum";
import CourseLandingPage from "../components/instructor/courses/add-new-course/CourseLandingPage";
import CourseSetting from "../components/instructor/courses/add-new-course/CourseSetting";
import { InstructorContext } from "@/context/InstructorContext";
import { decodeToken } from "@/lib/jwtDecoder"; 
import { addNewCourseService, fetchInstructorCourseDetailsService, updateCourseByIdService } from "@/services";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/lib/default";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserName } from "@/hooks/useFetchUserData";

export default function AddNewCourse() {

    const navigate = useNavigate()
    const {
        courseCurriculmFormData,
        courseLandingFormData, 
        setCourseLandingFormData,
        setCourseCurriculmFormData,
        currentEditedCourseId,
        setCurrentEditedCourseId
    } = useContext(InstructorContext);

    const params = useParams();
    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        }
    
        return value === "" || value === null || value === undefined;
    } 
    
    function validateFormData() {
        console.log("Validating form data...");
    
        // Validate course landing form
        for (const key in courseLandingFormData) {
            if (isEmpty(courseLandingFormData[key])) {
                console.error(`Landing page field "${key}" is empty.`);
                return false;
            }
        }
    
        // Validate curriculum
        let hasFreePreview = false;
        for (const item of courseCurriculmFormData) {
            if (isEmpty(item.title)) {
                console.error("Curriculum item missing title:", item);
                return false;
            }
            if (isEmpty(item.videoUrl)) {
                console.error("Curriculum item missing video URL:", item);
                return false;
            }
            if (item.freePreview) {
                hasFreePreview = true;
            }
        }
    
        if (!hasFreePreview) {
            console.error("No free preview available in curriculum.");
            return false;
        }
    
        console.log("Validation passed.");
        return true;
    }
    
    async function handleCreateCourse(){
        const token = localStorage.getItem("token"); // Replace 'yourTokenKey' with the actual key
            if (!token) {
                console.error("Token is missing.");
                return;
            }

        const decoded = decodeToken(token);
        const name = await fetchUserName(decoded.userId);
        if (!decoded) {
            console.error("Invalid or missing token.");
            return;
        }
        const courseFinalFormData={
            instructorId:decoded?.userId,
            instructorName : name,
            date: new Date(),
            Primarylanguage:courseLandingFormData.primaryLanguage,
            ...courseLandingFormData,
            students:[
                {
                    studentId:String,
                    studentName:String,
                    studentEmail:String
                }
            ],
            curriculum:courseCurriculmFormData,
            isPublished:true
        }
        if(currentEditedCourseId !==null){
            const response = await updateCourseByIdService(currentEditedCourseId, courseFinalFormData)
            if(response?.success){
                setCourseLandingFormData(courseLandingInitialFormData)
                setCourseCurriculmFormData(courseCurriculumInitialFormData)
                toast.success("course updated succeefuly");
                navigate(-1)
                setCurrentEditedCourseId(null)
            }
        }else{
            const response = await addNewCourseService(courseFinalFormData)
            if(response?.success){
                setCourseLandingFormData(courseLandingInitialFormData)
                setCourseCurriculmFormData(courseCurriculumInitialFormData)
                toast.success("course created succeefuly");
                navigate(-1)
            }
        }
    }
    async function fetchInstructorCourseDetails(){
        const response = await fetchInstructorCourseDetailsService(currentEditedCourseId)
        if(response?.success){
            const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc,key)=>{
                acc[key]=response?.data[key] || courseLandingInitialFormData[key]
                return acc
            },{})
            // console.log(setCourseFormData, response?.data)
            setCourseLandingFormData(setCourseFormData)
            setCourseCurriculmFormData(response?.data?.curriculum)
        }
    }
    useEffect(()=>{
        if(currentEditedCourseId!==null) fetchInstructorCourseDetails()
    },[currentEditedCourseId])
    useEffect(()=>{
        if(params?.courseId) setCurrentEditedCourseId(params?.courseId)
    },[ params?.courseId])
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold mb-5">create a new course</h1>
                <Button
                    disabled={!validateFormData()}
                    className={`text-sm font-bold px-8 tracking-wider 
                        ${!validateFormData() ? 'bg-gray-400 text-my-black cursor-not-allowed' : 'bg-my-white text-my-black'}`}

                    onClick={handleCreateCourse}
                >
                    Submit
                </Button>
            </div>
            <Card>
                <CardContent>
                    <div className="container mx-auto p-4">
                        <Tabs defaultValue="curriculum" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="curriculum">curriculum</TabsTrigger>
                                <TabsTrigger value="course-landing-page">Course landing page</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="curriculum">
                                <CourseCurriculum/>
                            </TabsContent>
                            <TabsContent value="course-landing-page">
                                <CourseLandingPage/>
                            </TabsContent>
                            <TabsContent value="settings">
                                <CourseSetting/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
