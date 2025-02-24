import { LoadingSpinner } from "@/components/server/ServerSideBar"
import { CoursesContext } from "@/context/CoursesContext"
import { UserContext } from "@/context/UserContext"
import { fetchUserData } from "@/hooks/useFetchUserData"
import { setLectureAsViewed } from "@/services"
import { CheckCircle, ChevronRight, Lock } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import ReactPlayer from "react-player"
import { useNavigate, useParams } from "react-router-dom"
import ProgressOfCourse from "./ProgressOfCourse"
import { useGetDaysDifference } from "@/hooks/courses/useGetDaysDiffrence"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { useAuthUser } from "@/hooks/jwt/useAuthUser"
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus"

export default function LectureList() {
  const userInfo = useAuthUser()
  const { user, setUser } = useContext(UserContext)
  const {onOpen} = useModal()
  const {
    selectedTitle,
    free,
    progress,
    setProgress,
    setVideoProgress,
    setSelectedTitle,
    selectedVideo,
    setSelectedVideo,
    studentViewCourseDetails,
    loading,
    searchDeatiledCourse,
    setFree,
  } = useContext(CoursesContext)

  const [showNextButton, setShowNextButton] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(userInfo.userId)
        setUser(data.user)
      } catch (err) {
        console.error("Error fetching user data:", err)
      }
    }
    fetchData()
  }, [setUser, userInfo.userId])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData(userInfo.userId)
      setFree(data.user)
    }
    fetchData()
  }, [userInfo.userId, setFree])
const status = useGetSubscriptionStatus()
  const diffDays = useGetDaysDifference(user.createdAt)

  // Update filtered modules to include lectures
  const filteredModules = studentViewCourseDetails?.modules?.filter(module => {
    const moduleMatches = module.title.toLowerCase().includes(searchDeatiledCourse?.toLowerCase());
    const lectureMatches = module.lectures.some(lecture => 
      lecture.title.toLowerCase().includes(searchDeatiledCourse?.toLowerCase())
    );
    return moduleMatches || lectureMatches;
  });

// Updated handleNextLecture to mark current lecture as viewed before moving to next
const handleNextLecture = async () => {
  let currentModuleIndex = -1;
  let currentLectureIndex = -1;

  // Find current position
  studentViewCourseDetails.modules.forEach((module, modIdx) => {
    module.lectures.forEach((lecture, lectIdx) => {
      if (lecture.title === selectedTitle) {
        currentModuleIndex = modIdx;
        currentLectureIndex = lectIdx;
      }
    });
  });

  if (currentModuleIndex === -1 || currentLectureIndex === -1) return;

  const currentModule = studentViewCourseDetails.modules[currentModuleIndex];
  const currentLecture = currentModule.lectures[currentLectureIndex];
  if (!currentModule || !currentLecture) {
    console.error("Current lecture not found in course structure");
    toast.error("Course structure appears corrupted");
    return;
  }

  // Verify the lecture exists in the course
  const lectureExists = currentModule.lectures.some(
    l => l._id === currentLecture._id
  );
  if (!lectureExists) {
    console.error("Lecture not found in course modules", {
      currentLectureId: currentLecture._id,
      moduleLectures: currentModule.lectures.map(l => l._id)
    });
    toast.error("Invalid lecture structure");
    return;
  }
  // First mark current lecture as viewed
  try {
    // Find the corresponding module in the progress data
    const moduleInProgress = findModuleInProgress(currentModule);
    
    if (!moduleInProgress) {
      console.error("Module not found in progress data", {
        currentModuleId: currentModule._id,
        progressModules: progress?.data?.moduleProgress?.map(m => m.moduleId)
      });
      toast.error("Could not update progress: Module mismatch");
      return;
    }
    
    const response = await setLectureAsViewed(
      userInfo.userId, 
      params.id, 
      moduleInProgress.moduleId, // Use the ID from progress data
      currentLecture._id
    );
    
    if (response.success) {
      toast.success("Lecture completed!");
      setProgress(response);
      
      // Now move to next lecture
      if (currentLectureIndex < currentModule.lectures.length - 1) {
        // Next lecture in same module
        const nextLecture = currentModule.lectures[currentLectureIndex + 1];
        handleVideoSelect(nextLecture.videoUrl, nextLecture.title, 
          diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
      } else if (currentModuleIndex < studentViewCourseDetails.modules.length - 1) {
        // First lecture in next module
        const nextModule = studentViewCourseDetails.modules[currentModuleIndex + 1];
        const nextLecture = nextModule.lectures[0];
        handleVideoSelect(nextLecture.videoUrl, nextLecture.title,
          diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
        
      } else {
        // Course completed
        toast.success("Course completed!");
        navigate(-1);
      }
    }
  } catch (error) {
    console.error("Error updating lecture progress:", error);
    toast.error("Failed to update progress");
  }
};

// Helper function to find the matching module in progress data
// Update the findModuleInProgress function
const findModuleInProgress = (moduleFromDetails) => {
  if (!progress?.data?.moduleProgress) return null;

  // 1. Try exact ID match first
  const idMatch = progress.data.moduleProgress.find(
    mp => mp.moduleId === moduleFromDetails._id
  );
  if (idMatch) return idMatch;

  // 2. Fallback to title match if ID doesn't match
  if (moduleFromDetails.title) {
    const titleMatch = progress.data.moduleProgress.find(
      mp => mp.title === moduleFromDetails.title
    );
    if (titleMatch) return titleMatch;
  }

  // 3. Fallback to position-based match as last resort
  const moduleIndex = studentViewCourseDetails.modules.findIndex(
    m => m._id === moduleFromDetails._id
  );
  
  if (moduleIndex >= 0 && moduleIndex < progress.data.moduleProgress.length) {
    return progress.data.moduleProgress[moduleIndex];
  }

  console.error("Module matching failed", {
    courseModule: moduleFromDetails,
    progressModules: progress.data.moduleProgress
  });
  
  return null;
};

// Fix handleLectureSelection to properly handle lecture selection without automatically marking as viewed
const handleLectureSelection = (modIndex, lectIndex, lecture) => {
  const isLocked = diffDays < studentViewCourseDetails.level && !lecture?.freePreview;
  
  if (isLocked) {
    onOpen(MODAL_TYPE.LEVEL_MODAL);
    return;
  }

  handleVideoSelect(lecture.videoUrl, lecture.title, isLocked);
};

// Updated handleVideoSelect to work with modules
const handleVideoSelect = (videoUrl, title, isLocked) => {

  // Find lecture in modules
  let currentLecture;
  studentViewCourseDetails.modules.forEach(module => {
    const lecture = module.lectures.find(lect => lect.title === title);
    if (lecture) currentLecture = lecture;
  });

  if (isLocked) {
    onOpen(MODAL_TYPE.LEVEL_MODAL);
    return;
  }

  if (currentLecture?.freePreview) {
    setSelectedVideo(videoUrl);
    setSelectedTitle(title);
    setVideoProgress(0);
    return;
  }

  if(status==="off"){
    onOpen(MODAL_TYPE.LIMITATION_MODAL)
    return
  }
  setSelectedVideo(videoUrl);
  setSelectedTitle(title);
  setVideoProgress(0);
};

// Check if current lecture is the last one in the entire course
const isLastLecture = () => {
  let isLast = false;
  
  if (!studentViewCourseDetails?.modules || !selectedTitle) return false;
  
  const lastModule = studentViewCourseDetails.modules[studentViewCourseDetails.modules.length - 1];
  if (!lastModule) return false;
  
  const lastLecture = lastModule.lectures[lastModule.lectures.length - 1];
  if (!lastLecture) return false;
  
  return selectedTitle === lastLecture.title;
};

// Update progress check
const getLectureProgress = (lectureId) => {
  if (!progress?.data?.moduleProgress) return null;
  
  // Search through all modules and their lectures
  for (const module of progress.data.moduleProgress) {
    const lecture = module.lectures.find(l => l.lectureId === lectureId);
    if (lecture) return lecture;
  }
  return null;
};

const handleProgress = (progress) => {
  setVideoProgress(progress.played)
  if (progress.played >= 0.5 && !showNextButton) {
    setShowNextButton(true)
  }
}

if (loading) return <LoadingSpinner />

return (
  <div className="flex flex-col md:flex-row h-[100dvh] bg-[#0A1720]">
    {/* Main Content - Video Player */}
    <div className="flex-1 flex flex-col min-h-[50dvh] md:h-full overflow-hidden">
      <div className="relative flex-1 w-full">
        {selectedVideo ? (
          <div className="absolute inset-0 flex flex-col">
            <div className="relative w-full h-full bg-black">
              <ReactPlayer
                url={selectedVideo}
                controls
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
                onProgress={handleProgress}
              />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-[#0A1720] gap-4">
              <h2 className="text-lg md:text-xl font-semibold text-white truncate max-w-full md:max-w-[60%]">
                {selectedTitle}
              </h2>
              <button
                onClick={
                    handleNextLecture
                  }
                
                disabled={!showNextButton}
                className={`w-full md:w-auto px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showNextButton
                    ? "bg-[#F7B955] hover:bg-[#F7B955]/90 text-black"
                    : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isLastLecture() ? "End Course" : "Next Lecture"}
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Select a video to watch
          </div>
        )}
      </div>
    </div>

   {/* Updated Sidebar with Modules */}
   <div className="w-full md:w-[380px] border-t md:border-t-0 md:border-l border-gray-800 bg-[#0A1720] overflow-hidden flex flex-col max-h-[50dvh] md:max-h-full">
      {/* <div className="sticky top-0 z-10 bg-[#0A1720]">
        <ProgressOfCourse />
      </div> */}
      <div className="flex-1 overflow-y-auto">
        {filteredModules?.length > 0 ? (
          <div className="p-2 space-y-4">
            {filteredModules.map((module, modIndex) => (
              <div key={modIndex} className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-gray-400 bg-[#1E2A35]/50 rounded-lg">
                  {module.title}
                </div>
                {module.lectures.map((lecture, lectIndex) => {
                  const progressData = getLectureProgress(lecture._id);
                  const isLectureViewed = progressData?.viewed === true;
                  const isLocked = diffDays < studentViewCourseDetails.level && !lecture?.freePreview;
                  const isActive = selectedTitle === lecture.title;

                  return (
                    <button
                      key={lectIndex}
                      onClick={() => {
                        if (isLocked) {
                          onOpen(MODAL_TYPE.LEVEL_MODAL);
                        } else {
                          handleVideoSelect(lecture.videoUrl, lecture.title);
                        }
                      }}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-[#1E2A35] text-white"
                          : "text-gray-300 hover:bg-[#1E2A35]/50"
                      } ml-2`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0">
                          {isLocked ? (
                            <Lock className="h-5 w-5 text-gray-400" />
                          ) : isLectureViewed ? (
                            <div className="h-6 w-6 rounded-full flex items-center justify-center border border-[#F7B955] text-[#F7B955] bg-[#F7B955]/20">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full flex items-center justify-center bg-[#1E2A35] text-white text-sm">
                              {lectIndex + 1}
                            </div>
                          )}
                        </div>
                        <span className="flex-1 text-sm truncate">{lecture.title}</span>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No modules available
          </div>
        )}
      </div>
    </div>
  </div>
);
}