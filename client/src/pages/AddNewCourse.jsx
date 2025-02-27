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
      
      // Check each module
      for (const module of courseCurriculmFormData) {
        if (isEmpty(module.title)) {
          console.error("Module missing title:", module);
          return false;
        }
    
        // Check each submodule
        for (const subModule of module.subModules) {
          if (isEmpty(subModule.title)) {
            console.error("Submodule missing title:", subModule);
            return false;
          }
    
          // Check each lecture in submodule
          for (const lecture of subModule.lectures) {
            if (isEmpty(lecture.title)) {
              console.error("Lecture missing title:", lecture);
              return false;
            }
            if (isEmpty(lecture.videoUrl)) {
              console.error("Lecture missing video URL:", lecture);
              return false;
            }
            if (lecture.freePreview) {
              hasFreePreview = true;
            }
          }
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
        const courseFinalFormData = {
          instructorId: decoded?.userId,
          instructorName: name,
          date: new Date(),
          primaryLanguage: courseLandingFormData.primaryLanguage,
          ...courseLandingFormData,
          students: [],
          modules: courseCurriculmFormData.map(module => ({
            title: module.title,
            subModules: module.subModules.map(subModule => ({
              title: subModule.title,
              lectures: subModule.lectures.map(lecture => ({
                title: lecture.title,
                videoUrl: lecture.videoUrl,
                freePreview: lecture.freePreview,
                descriptionTitle: lecture.descriptionTitle, // Add this line
                description: lecture.description // Add this line
              }))
            }))
          })),
          isPublished: true
        };
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
    async function fetchInstructorCourseDetails() {
      const response = await fetchInstructorCourseDetailsService(currentEditedCourseId);
      if (response?.success) {
        const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
          acc[key] = response?.data[key] || courseLandingInitialFormData[key];
          return acc;
        }, {});
        
        setCourseLandingFormData(setCourseFormData);
        
        // Map API response to match our submodule structure
        const mappedCurriculum = response?.data?.modules?.map(module => ({
          title: module.title || "New Module",
          subModules: module.subModules?.map(subModule => ({
            title: subModule.title || "New Submodule",
            lectures: subModule.lectures?.map(lecture => ({
              title: lecture.title || "",
              videoUrl: lecture.videoUrl || "",
              freePreview: lecture.freePreview || false,
              descriptionTitle: lecture.descriptionTitle || "",
              description: lecture.description || ""
            })) || []
          })) || [{
            title: "New Submodule",
            lectures: [{
              title: "",
              videoUrl: "",
              freePreview: false,
              descriptionTitle: "",
              description: ""
            }]
          }]
        })) || courseCurriculumInitialFormData;
        
        setCourseCurriculmFormData(mappedCurriculum);
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
