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
import { useGetDaysDifference } from "@/hooks/courses/useGetDaysDiffrence"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { useAuthUser } from "@/hooks/jwt/useAuthUser"
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus"

export default function LectureList() {
   // State for tracking which modules are expanded

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


const status = useGetSubscriptionStatus()
  const diffDays = useGetDaysDifference(user.createdAt)
console.log(studentViewCourseDetails)
  // Update filtered modules to include lectures
  const filteredModules = studentViewCourseDetails?.modules?.filter(module => {
    const searchTerm = searchDeatiledCourse?.toLowerCase() || '';
    const moduleMatches = module.title.toLowerCase().includes(searchTerm);
    const lectureMatches = module.lectures && Array.isArray(module.lectures) ? 
      module.lectures.some(lecture => lecture.title.toLowerCase().includes(searchTerm)) : 
      false;
    return moduleMatches || lectureMatches;
  })||[];
  const [expandedModules, setExpandedModules] = useState(
    filteredModules.length > 0 
      ? filteredModules.reduce((acc, _, index) => ({ ...acc, [index]: true }), {}) 
      : {}  // Default to an empty object if there are no modules
  );
  
  // Toggle module expansion
  const toggleModule = (moduleIndex) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex],
    }))
  }
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
// Updated handleNextLecture to mark current lecture as viewed before moving to next
const handleNextLecture = async () => {
  let currentModuleIndex = -1;
  let currentLectureIndex = -1;
  let isInSubModule = false;
  let currentSubModuleIndex = -1;
  let currentSubModule = null; // Declare currentSubModule here

  // Find current position
  if (studentViewCourseDetails?.modules) {
    studentViewCourseDetails.modules.forEach((module, modIdx) => {
      // Check if lectures exists directly in the module
      if (module.lectures && Array.isArray(module.lectures)) {
        module.lectures.forEach((lecture, lectIdx) => {
          if (lecture.title === selectedTitle) {
            currentModuleIndex = modIdx;
            currentLectureIndex = lectIdx;
          }
        });
      }
      
      // Check if lectures are in subModules
      if (module.subModules && Array.isArray(module.subModules)) {
        module.subModules.forEach((subModule, subModIdx) => {
          if (subModule.lectures && Array.isArray(subModule.lectures)) {
            subModule.lectures.forEach((lecture, lectIdx) => {
              if (lecture.title === selectedTitle) {
                currentModuleIndex = modIdx;
                currentSubModuleIndex = subModIdx;
                currentLectureIndex = lectIdx;
                isInSubModule = true;
                currentSubModule = subModule; // Assign currentSubModule here
              }
            });
          }
        });
      }
    });
  }

  if (currentModuleIndex === -1 || currentLectureIndex === -1) return;

  const currentModule = studentViewCourseDetails.modules[currentModuleIndex];
  if (!currentModule) {
    console.error("Current module not found in course structure");
    toast.error("Course structure appears corrupted");
    return;
  }

  let currentLecture;
  let lectureExists = false;
  
  // Get the current lecture based on where it was found
  if (isInSubModule) {
    if (!currentSubModule || !currentSubModule.lectures) {
      console.error("Current submodule or lectures not found");
      toast.error("Course structure appears corrupted");
      return;
    }
    currentLecture = currentSubModule.lectures[currentLectureIndex];
    
    // Verify the lecture exists in the course
    lectureExists = currentSubModule.lectures.some(l => l._id === currentLecture._id);
  } else {
    if (!currentModule.lectures) {
      console.error("Current module lectures not found");
      toast.error("Course structure appears corrupted");
      return;
    }
    currentLecture = currentModule.lectures[currentLectureIndex];
    
    // Verify the lecture exists in the course
    lectureExists = currentModule.lectures.some(l => l._id === currentLecture._id);
  }
  
  if (!currentLecture) {
    console.error("Current lecture not found in course structure");
    toast.error("Course structure appears corrupted");
    return;
  }
  
  if (!lectureExists) {
    console.error("Lecture not found in course modules", {
      currentLectureId: currentLecture._id,
      isInSubModule
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
    console.log(moduleInProgress)
      // When calling setLectureAsViewed:
      const response = await setLectureAsViewed(
        userInfo.userId, 
        params.id, 
        moduleInProgress.moduleId,
        currentSubModule._id,
        currentLecture._id
      );
    
    if (response.success) {
      toast.success("Lecture completed!");
      setProgress(response);
      
      // Navigate to next lecture based on the structure (subModule or direct)
      if (isInSubModule) {
        if (currentLectureIndex < currentSubModule.lectures.length - 1) {
          // Next lecture in same submodule
          const nextLecture = currentSubModule.lectures[currentLectureIndex + 1];
          handleVideoSelect(nextLecture.videoUrl, nextLecture.title, 
            diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
        } else if (currentSubModuleIndex < currentModule.subModules.length - 1) {
          // First lecture in next submodule
          const nextSubModule = currentModule.subModules[currentSubModuleIndex + 1];
          if (nextSubModule.lectures && nextSubModule.lectures.length > 0) {
            const nextLecture = nextSubModule.lectures[0];
            handleVideoSelect(nextLecture.videoUrl, nextLecture.title,
              diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
          }
        } else if (currentModuleIndex < studentViewCourseDetails.modules.length - 1) {
          // Move to next module
          const nextModule = studentViewCourseDetails.modules[currentModuleIndex + 1];
          if (nextModule.lectures && nextModule.lectures.length > 0) {
            // If next module has direct lectures
            const nextLecture = nextModule.lectures[0];
            handleVideoSelect(nextLecture.videoUrl, nextLecture.title,
              diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
          } else if (nextModule.subModules && nextModule.subModules.length > 0 && 
                    nextModule.subModules[0].lectures && nextModule.subModules[0].lectures.length > 0) {
            // If next module has lectures in submodules
            const nextLecture = nextModule.subModules[0].lectures[0];
            handleVideoSelect(nextLecture.videoUrl, nextLecture.title,
              diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
          }
        } else {
          // Course completed
          toast.success("Course completed!");
          navigate(-1);
        }
      } else {
        // Direct module lectures navigation
        if (currentLectureIndex < currentModule.lectures.length - 1) {
          // Next lecture in same module
          const nextLecture = currentModule.lectures[currentLectureIndex + 1];
          handleVideoSelect(nextLecture.videoUrl, nextLecture.title, 
            diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
        } else if (currentModuleIndex < studentViewCourseDetails.modules.length - 1) {
          // First lecture in next module
          const nextModule = studentViewCourseDetails.modules[currentModuleIndex + 1];
          if (nextModule.lectures && nextModule.lectures.length > 0) {
            const nextLecture = nextModule.lectures[0];
            handleVideoSelect(nextLecture.videoUrl, nextLecture.title,
              diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
          } else if (nextModule.subModules && nextModule.subModules.length > 0 && 
                    nextModule.subModules[0].lectures && nextModule.subModules[0].lectures.length > 0) {
            const nextLecture = nextModule.subModules[0].lectures[0];
            handleVideoSelect(nextLecture.videoUrl, nextLecture.title,
              diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
          }
        } else {
          // Course completed
          toast.success("Course completed!");
          navigate(-1);
        }
      }
    }
  } catch (error) {
    console.error("Error updating lecture progress:", error);
    toast.error("Failed to update progress");
  }
};

// Update the findModuleInProgress function
const findModuleInProgress = (moduleFromDetails) => {
  if (!progress?.data?.moduleProgress) return null;
  console.log(moduleFromDetails._id)
  // Convert ObjectId to string
  const targetId = moduleFromDetails._id

  // 1. Match by ID
  const idMatch = progress.data.moduleProgress.find(
    mp => mp.moduleId === targetId
  );
  if (idMatch) return idMatch;
  

  // 2. Fallback to title match
  if (moduleFromDetails.title) {
    const titleMatch = progress.data.moduleProgress.find(
      mp => mp.title === moduleFromDetails.title
    );
    if (titleMatch) return titleMatch;
  }

  // 3. Fallback to position-based match
  const moduleIndex = studentViewCourseDetails.modules.findIndex(
    m => m._id.toString() === targetId
  );
  
  if (moduleIndex >= 0 && moduleIndex < progress.data.moduleProgress.length) {
    return progress.data.moduleProgress[moduleIndex];
  }

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
 // Check if modules exist before iterating
    if (studentViewCourseDetails?.modules) {
      studentViewCourseDetails.modules.forEach(module => {
        // Safely access lectures with optional chaining
        if (module.lectures && Array.isArray(module.lectures)) {
          const lecture = module.lectures.find(lect => lect.title === title);
          if (lecture) currentLecture = lecture;
    }
    // If lectures are nested in subModules, check there too
    if (module.subModules && Array.isArray(module.subModules)) {
      module.subModules.forEach(subModule => {
        if (subModule.lectures && Array.isArray(subModule.lectures)) {
          const lecture = subModule.lectures.find(lect => lect.title === title);
          if (lecture) currentLecture = lecture;
        }
      });
    }
    });
    }

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
  if (!studentViewCourseDetails?.modules || !selectedTitle) return false;
  
  const lastModule = studentViewCourseDetails.modules[studentViewCourseDetails.modules.length - 1];
  if (!lastModule) return false;
  
  // Check if lectures exists before accessing its length
  if (!lastModule.lectures || !Array.isArray(lastModule.lectures)) {
    // Check if the module has subModules instead
    if (lastModule.subModules && Array.isArray(lastModule.subModules) && lastModule.subModules.length > 0) {
      const lastSubModule = lastModule.subModules[lastModule.subModules.length - 1];
      if (lastSubModule && lastSubModule.lectures && Array.isArray(lastSubModule.lectures) && lastSubModule.lectures.length > 0) {
        const lastLecture = lastSubModule.lectures[lastSubModule.lectures.length - 1];
        return selectedTitle === lastLecture.title;
      }
    }
    return false;
  }
  
  const lastLecture = lastModule.lectures[lastModule.lectures.length - 1];
  if (!lastLecture) return false;
  
  return selectedTitle === lastLecture.title;
};


// Add this helper function to get lecture progress
const getLectureProgress = (lectureId) => {
  if (!progress?.data?.moduleProgress) return null;
  
  for (const module of progress.data.moduleProgress) {
    for (const subModule of module.subModules) {
      const lecture = subModule.lectures.find(l => l.lectureId === lectureId.toString());
      if (lecture) return lecture;
    }
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
// Add these helper functions
// Updated calculateModuleProgress function
const calculateModuleProgress = (module) => {
  if (!progress?.data?.moduleProgress) return 0;
  
  // Find matching module progress
  const moduleProgress = progress.data.moduleProgress.find(
    mp => mp.moduleId === module._id.toString()
  );
  
  if (!moduleProgress) return 0;

  // Calculate total lectures in the module
  const totalLectures = module.subModules?.reduce(
    (acc, subModule) => acc + (subModule.lectures?.length || 0),
    0
  ) || 0;

  // Calculate viewed lectures from progress data
  const viewedLectures = moduleProgress.subModules?.reduce((acc, subModuleProgress) => {
    return acc + (subModuleProgress.lectures?.filter(l => l.viewed).length || 0);
  }, 0) || 0;

  return totalLectures > 0 ? Math.round((viewedLectures / totalLectures) * 100) : 0;
};





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
  {/* Updated Sidebar with Modules → Submodules → Lectures */}
     {/* Course Structure Sidebar */}
  <div className="w-full md:w-[380px] border-t md:border-t-0 md:border-l border-gray-800 bg-[#0A1720] overflow-hidden flex flex-col max-h-[50dvh] md:max-h-full custom-scroll">
      
      <div className="flex-1 overflow-y-auto p-[1px] custom-scroll">
        {filteredModules?.map((module, modIndex) => {
          const totalLectures = module?.subModules?.reduce(
            (acc, subModule) => acc + (subModule?.lectures?.length || 0),
            0
          );
          const isExpanded = expandedModules[modIndex]

          return(
            <div key={modIndex} >
            {/* Module Header with Progress */}
            <div 
              className=" border-solid border-[1px] rounded-md p-4 border-my-gold cursor-pointer" 
              onClick={() => toggleModule(modIndex)}
            >
              <div className="flex items-center justify-between ">
                <h3 className="text-lg font-semibold text-white ">{module.title}</h3>
              </div>
              <span className="text-gray-400 text-xs">
                  <span className="text-white">{calculateModuleProgress(module)}%</span> Complete
                </span>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-my-gold h-1 rounded-full mt-1" 
                  style={{ width: `${calculateModuleProgress(module)}%` }}
                ></div>
              </div>
              <div className="flex flex-row gap-2 mt-2 items-center font-light text-gray-400 text-xs">
                <p className="">
                  <span className="font-semibold text-white">{module?.subModules.length}</span> Modules
                </p>
                <p className="">
                  <span className="font-semibold text-white">{totalLectures}</span> Lessons
                </p>
              </div>
            </div>

            {/* Submodules */}
            {isExpanded && module.subModules?.map((subModule, subModIndex) => (
              <div key={subModIndex} className="p-2">
                {/* Submodule Header */}
                <div className="flex items-center justify-between mt-2 mb-1 border-b border-cyan-950">
                  <h4 className="text-sm font-medium text-gray-300">{subModule.title}</h4>
                  {/* <span className="text-xs text-gray-500">
                    {subModule.lectures?.length} lessons
                  </span> */}
                </div>

                {/* Lectures */}
                {subModule.lectures?.map((lecture, lectIndex) => {
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
                        className={`w-full flex items-center p-3 rounded-sm text-left transition-colors hover:bg-yellow-400/5 ${
                          isActive
                            ? " text-white bg-yellow-400/5 border-r-[3px] border-my-gold"
                            : "text-gray-300 hover:bg-[#1E2A35]/50"
                        }`}
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
                          <ChevronRight className="h-6 w-6 text-white" />
                        </div>
                      </button>
                  );
                })}
              </div>
            ))}
          </div>
          )
        }
        )}
      </div>
    </div>
  </div>
);
}