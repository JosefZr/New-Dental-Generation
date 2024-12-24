import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoursesContext } from "@/context/CoursesContext";
import { fetchUserData } from "@/hooks/useFetchUserData";
import { addUserToCourse, fetchStudentCourseDetailsService, fetchStudentCourseProgressionDetails, setLectureAsViewed } from "@/services";
import { jwtDecode } from "jwt-decode";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import ReactPlayer from "react-player";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";

export default function StudentViewCourseDetailsPage() {
    const [free, setFree] = useState({});
    const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
    const [selectedTitle, setSelectedTitle] = useState(null); // State for selected title
    const [videoProgress, setVideoProgress] = useState(0); // Track video progress
    const {progress, setProgress} = useContext(CoursesContext)
    const [showNextButton, setShowNextButton] = useState(false); // Show "Next Lecture" button
    const navigate = useNavigate();

    const { loading, setLoading, studentViewCourseDetails, setStudentViewCourseDetails, currentCoursedetailsId, setCurrentCourseDetailsId, studentCurrentCourseProgress, setStudentCurrentCourseProgress } = useContext(CoursesContext);
    const { id } = useParams();
    const location = useLocation();
    const params = useParams();
    const userInfo = jwtDecode(localStorage.getItem("token"));

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserData(userInfo.userId);
            setFree(data.user);
        };
        fetchData();
    }, [userInfo.userId]);

    const handleVideoSelect = (videoUrl, title, isLocked) => {
        if (isLocked) {
            toast.error("This content is locked.");
            return;
        }
        setSelectedVideo(videoUrl);
        setSelectedTitle(title);
        setVideoProgress(0); // Reset progress for the new video
        setShowNextButton(false); // Hide "Next Lecture" button for the new video
    };

    const handleProgress = (progress) => {
        setVideoProgress(progress.played); // Update progress (value between 0 and 1)
        if (progress.played >= 0.5 && !showNextButton) {
            setShowNextButton(true); // Show "Next Lecture" button when progress is >= 50%
        }
    };

    const handleNextLecture = async () => {
        const currentIndex = studentViewCourseDetails.curriculum.findIndex(
            (curr) => curr.title === selectedTitle
        );
    
        if (currentIndex >= 0 && currentIndex < studentViewCourseDetails.curriculum.length - 1) {
            // Handle progressing to the next lecture
            const nextLecture = studentViewCourseDetails.curriculum[currentIndex + 1];
            const currentLecture = studentViewCourseDetails.curriculum[currentIndex];
    
            try {
                // Call API to mark the current lecture as viewed
                const response = await setLectureAsViewed(
                    userInfo.userId,
                    params.id,
                    currentLecture._id
                );
    
                if (response.success) {
                    toast.success("Lecture marked as viewed.");
                    // Update the curriculum array to reflect the new progress
                    setProgress(response)
                } else {
                    toast.error("Failed to update lecture progress.");
                }
    
                // Proceed to the next lecture
                handleVideoSelect(nextLecture.videoUrl, nextLecture.title, !nextLecture?.freePreview && isFreeUser);
            } catch (error) {
                console.error("Error updating lecture progress:", error);
                toast.error("An error occurred while updating progress.");
            }
        } else {
            // Handle marking the last lecture as viewed and redirecting
            const lastLecture = studentViewCourseDetails.curriculum[currentIndex];
            try {
                const response = await setLectureAsViewed(
                    userInfo.userId,
                    params.id,
                    lastLecture._id
                );
    
                if (response.success) {
                    toast.success("You've completed the course!");
                    navigate(-1); // Redirect to the previous page
                } else {
                    toast.error("Failed to update lecture progress.");
                }
            } catch (error) {
                console.error("Error updating last lecture progress:", error);
                toast.error("An error occurred while completing the course.");
            }
        }
    };
    
    useEffect(() => {
        // Automatically select the first unviewed lecture when entering the course
        if (studentViewCourseDetails?.curriculum) {
            const firstUnviewedLecture = studentViewCourseDetails.curriculum.find(
                (curr) => !progress.data.lectureProgress.some((prog) => prog.lectureId === curr._id && prog.viewed)
            );
            if (firstUnviewedLecture) {
                handleVideoSelect(firstUnviewedLecture.videoUrl, firstUnviewedLecture.title, !firstUnviewedLecture?.freePreview && isFreeUser);
            }
        }
    }, []);

    async function setUserToProgress() {
        try {
            const course = await fetchStudentCourseProgressionDetails(userInfo.userId, params.id);
            setProgress(course);
            console.log(progress)
        } catch (error) {
            console.error("Error in setUserToACourse:", error);
            toast.error("An error occurred while setting progress.");
        }
    }

    async function setUserToACourse() {
        try {
            const course = await fetchStudentCourseDetailsService(params.id);
            if (!course || !Array.isArray(course.data.students)) {
                console.error("Invalid course data or students array is missing.");
                return;
            }
            const existingStudent = course.data.students.find(student => student.studentId === userInfo.userId);

            if (existingStudent) {
                console.warn("User already exists in the course.");
                return;
            }
            const res = await addUserToCourse(userInfo.userId, userInfo.firstName, userInfo.email, params.id);
            if (res?.success) {
                toast.success("Successfully enrolled in the course.");
            } else {
                toast.error("Failed to enroll.");
            }
        } catch (error) {
            console.error("Error in setUserToACourse:", error);
            toast.error("An error occurred while enrolling.");
        }
    }

    const fetchStudentViewCourseDetails = async () => {
        try {
            const response = await fetchStudentCourseDetailsService(currentCoursedetailsId);
            if (response?.success) {
                setStudentViewCourseDetails(response.data);
                console.log(response.data);
                await setUserToACourse();
                await setUserToProgress();
                toast.success(response.message);
            } else {
                setStudentViewCourseDetails(null);
                toast.error("Failed to fetch course details.");
            }
        } catch (error) {
            console.error("Error fetching course details:", error);
            toast.error("An error occurred while fetching the course details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentCoursedetailsId !== null) {fetchStudentViewCourseDetails() ,setUserToProgress()}
    }, [currentCoursedetailsId]);

    useEffect(() => {
        if (id) setCurrentCourseDetailsId(id);
    }, [id]);

    useEffect(() => {
        if (!location.pathname.includes('/course/details')) {
            setStudentViewCourseDetails(null), setCurrentCourseDetailsId(null);
        }
    }, [location.pathname]);
    useEffect(() => {
        if (studentViewCourseDetails && progress?.data?.lectureProgress) {
            const firstUnviewedLecture = studentViewCourseDetails.curriculum.find((curr) => {
                const progressData = progress.data.lectureProgress.find(
                    (prog) => prog.lectureId === curr._id
                );
                return !progressData?.viewed; // Check if the lecture is not viewed
            });
    
            if (firstUnviewedLecture) {
                setSelectedVideo(firstUnviewedLecture.videoUrl);
                setSelectedTitle(firstUnviewedLecture.title);
            } else if (studentViewCourseDetails.curriculum.length > 0) {
                // Fallback to the first lecture if all are viewed
                const firstLecture = studentViewCourseDetails.curriculum[0];
                setSelectedVideo(firstLecture.videoUrl);
                setSelectedTitle(firstLecture.title);
            }
        }
    }, [studentViewCourseDetails, progress]);
    
    if (loading) return <Skeleton />;

    const isFreeUser = free.subscriptionPlan === "freeTrial" && free.isPaid === false && new Date(free.trialEndDate).getTime() > Date.now();

    return (
        <div className="container mx-auto p-4">
            <Header/>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <main className="flex-grow">
                    <Card className="mb-8 bg-my-dark-blue text-my-white border-gray-800 shadow-md shadow-slate-900">
                        <CardHeader>
                            <CardTitle>Course Curriculum</CardTitle>
                        </CardHeader>
                        <CardContent className="ml-1 px-2">
                        {studentViewCourseDetails?.curriculum?.map((curr, index) => {
                            const progressData = progress.data.lectureProgress.find(
                                (prog) => prog.lectureId === curr._id
                            );
                            const isLectureViewed = progressData?.viewed===true ; //
                            return (
                                <li
                                key={index}
                                className={`${
                                    !curr?.freePreview && isFreeUser
                                        ? "cursor-not-allowed opacity-50"
                                        : "cursor-pointer"
                                } flex items-center gap-2 transition-all cursor-pointer hover:bg-slate-900 pl-1 py-2 rounded-lg ${
                                    selectedTitle === curr?.title ? "border-l-4 border-my-green" : ""
                                }`}
                                onClick={() =>
                                    handleVideoSelect(
                                        curr.videoUrl,
                                        curr.title,
                                        curr.lectureId,
                                        !curr?.freePreview && isFreeUser
                                    )
                                }
                            >
                                {/* Display different icons based on progress */}
                                {isLectureViewed? (
                                    <CheckCircle className="text-my-green mr-2 h-6 w-6" />
                                ) : curr?.freePreview || !isFreeUser ? (
                                    <PlayCircle className="text-my-white mr-2 h-6 w-6" />
                                ) : (
                                    <Lock className="text-my-white mr-2 h-6 w-6" />
                                )}
                                <span className="flex w-full items-center justify-between">{curr?.title}</span>
                            </li>
                            )
                        })}
                        </CardContent>
                    </Card>
                </main>
                <aside className="w-2/3 h-full">
                    <Card className="sticky top-4 bg-my-dark-blue border-gray-800 shadow-md shadow-slate-900">
                        <CardContent className="p-6">
                            {selectedVideo ? (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">{selectedTitle}</h2>
                                    <ReactPlayer
                                        url={selectedVideo}
                                        controls
                                        width="100%"
                                        height="300px"
                                        className="react-player rounded-lg"
                                        onProgress={handleProgress}
                                    />
                                    
                                    <button
                                    onClick={handleNextLecture}
                                    className={`mt-4 px-4 py-2 bg-my-green text-black bg-my-white rounded-lg ${
                                        !showNextButton ? "cursor-not-allowed opacity-50" : ""
                                    }`}
                                >
                                    {studentViewCourseDetails?.curriculum.findIndex(
                                        (curr) => curr.title === selectedTitle
                                    ) === studentViewCourseDetails.curriculum.length - 1
                                        ? "End Course"
                                        : "Next Lecture"}
                                </button>
                                </div>
                            ) : (
                                <p className="text-my-white">Select a video to watch.</p>
                            )}
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
