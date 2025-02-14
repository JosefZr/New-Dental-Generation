import { LoadingSpinner } from "@/components/server/ServerSideBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CoursesContext } from "@/context/CoursesContext";
import { UserContext } from "@/context/UserContext";
import { fetchUserData } from "@/hooks/useFetchUserData";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { setLectureAsViewed } from "@/services";
import { jwtDecode } from "jwt-decode";
import { Lock } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaChevronRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

export default function LectureList() {
       // Fix date difference calculation
        // Effect to fetch user data
        const userInfo = jwtDecode(localStorage.getItem("token"))
       const {user,setUser} = useContext(UserContext)
       const {
        selectedTitle,
        free,
        setProgress,
        setVideoProgress,
        setSelectedTitle,
        selectedVideo,
        setSelectedVideo,
        studentViewCourseDetails,//
    } = useContext(CoursesContext);

      useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await fetchUserData(userInfo.userId);
            setUser(data.user);
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
        };
        fetchData();
    }, [setUser, userInfo.userId]);
       const getDaysDifference = (createdAt) => {
        const created = new Date(createdAt);
        const now = new Date();
        
        // Reset time portion to ensure accurate day calculation
        created.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(now - created);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    
    const diffDays = getDaysDifference(user.createdAt);

    const { isOpen, onClose, type } = useModal();
    const params = useParams();
    const navigate = useNavigate();
    const [showNextButton, setShowNextButton] = useState(false);
    
    const isModalOpen = isOpen && type === MODAL_TYPE.VIDEO_MODAL;
   
    const {onOpen}= useModal()
    const {  loading, searchDeatiledCourse, progress, setFree } =
    useContext(CoursesContext); // State for search input
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserData(userInfo.userId);
            setFree(data.user);
        };
        fetchData();
    }, [userInfo.userId]);

    const filteredLectures = studentViewCourseDetails?.curriculum?.filter((curr) =>
        curr.title.toLowerCase().includes(searchDeatiledCourse?.toLowerCase())
    );

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

    const handleNextLecture = async () => {
        const currentIndex = studentViewCourseDetails.curriculum.findIndex(
          (curr) => curr.title === selectedTitle
        );
    
        if (currentIndex >= 0 && currentIndex < studentViewCourseDetails.curriculum.length - 1) {
          const nextLecture = studentViewCourseDetails.curriculum[currentIndex + 1];
          const currentLecture = studentViewCourseDetails.curriculum[currentIndex];
    
          try {
            const response = await setLectureAsViewed(
              userInfo.userId,
              params.id,
              currentLecture._id
            );
    
            if (response.success) {
              toast.success("Lecture marked as viewed.");
              setProgress(response);
            } else {
              toast.error("Failed to update lecture progress.");
            }
    
            handleVideoSelect(nextLecture.videoUrl, nextLecture.title, !nextLecture?.freePreview && isFreeUser);
          } catch (error) {
            console.error("Error updating lecture progress:", error);
            toast.error("An error occurred while updating progress.");
          }
        } else {
          const lastLecture = studentViewCourseDetails.curriculum[currentIndex];
          try {
            const response = await setLectureAsViewed(
              userInfo.userId,
              params.id,
              lastLecture._id
            );
    
            if (response.success) {
              toast.success("You've completed the course!");
              navigate(-1);
            } else {
              toast.error("Failed to update lecture progress.");
            }
          } catch (error) {
            console.error("Error updating last lecture progress:", error);
            toast.error("An error occurred while completing the course.");
          }
        }
      };
      const handleVideoSelect = (videoUrl, title, isLocked) => {
        if (isLocked) {
          toast.error("This content is locked.");
          return;
        }
        setSelectedVideo(videoUrl);
        setSelectedTitle(title);
        setVideoProgress(0); // Reset progress for the new video
      };
    
      const handleProgress = (progress) => {
        setVideoProgress(progress.played);
        if (progress.played >= 0.5 && !showNextButton) {
          setShowNextButton(true);
        }
      };
    
    if (loading) return <LoadingSpinner />;
    const isFreeUser =
        free.subscriptionPlan === "freeTrial" &&
        free.isPaid === false &&
        new Date(free.trialEndDate).getTime() > Date.now();
        const handleClose = () => {
            onClose();
          };
    return (
        <div className="flex-1 overflow-auto">
            <div className="p-2 pb-32">
                <div className="">
                    {filteredLectures?.length > 0 ? (
                        filteredLectures.map((curr, index) => {
                            const progressData = progress.data.lectureProgress.find(
                                (prog) => prog.lectureId === curr._id
                            );
                            const isLectureViewed = progressData?.viewed === true; //
                            // Determine if the lecture should be locked
                            const isLocked = diffDays < studentViewCourseDetails.level && !curr?.freePreview;
                            return (
                                <div
            className={`flex w-full flex-col text-start items-start justify-start gap-2 transition-all mb-1 rounded-[4px] p-3 ${
                isLocked ? "cursor-not-allowed opacity-50" : "hover:bg-primary/10 cursor-pointer"
            }`}
            key={index}
            onClick={() => {
                if (!isLocked) {
                    handleVideoSelect(curr.videoUrl, curr.title, isLocked);
                    onOpen(MODAL_TYPE.VIDEO_MODAL);
                }
            }}
        >
            <div className="flex w-full items-center gap-1 rounded-sm bg-opacity-5 text-sm duration-75 ease-in-out">
                {/* Icon Handling */}
                {isLocked ? (
                    <Lock className="text-my-white mr-2 h-6 w-6" />
                ) : isLectureViewed ? (
                    <div
                        className="mr-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[4px] bg-base-300 font-bold text-lg border border-my-gold text-my-gold"
                        style={{
                            backgroundColor: "hsl(41.217 75.163% 70%/0.2)",
                        }}
                    >
                        ✓
                    </div>
                ) : (
                    <div
                        className="mr-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[4px] font-bold text-lg"
                        style={{
                            backgroundColor: "hsl(213.53 34% 19.608%)",
                        }}
                    >
                        {index}
                    </div>
                )}

                <span className="flex w-full items-center justify-between">
                    {curr?.title}
                </span>

                {/* Show lock icon if locked */}
                {isLocked ? <Lock className="text-my-white h-6 w-6" /> : <FaChevronRight className="h-6 w-6" />}
            </div>
        </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-gray-500">
                            No lectures available.
                        </div>
                    )}
                </div>
            </div>
            <Dialog open={isModalOpen} onOpenChange={handleClose}>
                <DialogContent className="max-w-3xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
                    {/* Header */}
                    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold truncate">{selectedTitle || "Video Player"}</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white">
                        <IoMdClose size={24} />
                    </button>
                    </header>

                    {/* Main Content */}
                    <div className="p-6">
                    {selectedVideo ? (
                        <div className="flex flex-col items-center space-y-4">
                        <ReactPlayer
                            url={selectedVideo}
                            controls
                            width="100%"
                            height="360px"
                            className="rounded-lg shadow-lg"
                            onProgress={handleProgress}
                        />

                        <button
                            onClick={handleNextLecture}
                            className={`px-4 py-2 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600 ${
                            !showNextButton ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={!showNextButton}
                        >
                            {studentViewCourseDetails?.curriculum.findIndex((curr) => curr.title === selectedTitle) ===
                            studentViewCourseDetails.curriculum.length - 1
                            ? "End Course"
                            : "Next Lecture"}
                        </button>
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">Select a video to watch.</p>
                    )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}


