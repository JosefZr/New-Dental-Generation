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
  const [currentLecture, setCurrentLecture] = useState(null);
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
  // Add these new state variables at the top of your component
const [showDescription, setShowDescription] = useState(false);
const [nextLecture, setNextLecture] = useState(null);
// Updated handleNextLecture to mark current lecture as viewed before moving to next
const handleNextLecture = async () => {
  // Handle description view first
  if (showDescription && nextLecture) {
    setCurrentLecture(nextLecture);
    setShowDescription(false);
    handleVideoSelect(nextLecture.videoUrl, nextLecture.title, 
      diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview);
    return;
  }

  // Find current position
  let currentModuleIndex = -1;
  let currentLectureIndex = -1;
  let isInSubModule = false;
  let currentSubModuleIndex = -1;
  let currentSubModule = null;

  studentViewCourseDetails?.modules?.forEach((module, modIdx) => {
    // Check direct lectures
    module.lectures?.forEach((lecture, lectIdx) => {
      if (lecture.title === selectedTitle) {
        currentModuleIndex = modIdx;
        currentLectureIndex = lectIdx;
      }
    });

    // Check submodule lectures
    module.subModules?.forEach((subModule, subModIdx) => {
      subModule.lectures?.forEach((lecture, lectIdx) => {
        if (lecture.title === selectedTitle) {
          currentModuleIndex = modIdx;
          currentSubModuleIndex = subModIdx;
          currentLectureIndex = lectIdx;
          isInSubModule = true;
          currentSubModule = subModule;
        }
      });
    });
  });

  if (currentModuleIndex === -1 || currentLectureIndex === -1) return;

  const currentModule = studentViewCourseDetails.modules[currentModuleIndex];
  if (!currentModule) {
    toast.error("Course structure error");
    return;
  }

  // Get current lecture
  const currentLecture = isInSubModule
    ? currentSubModule?.lectures?.[currentLectureIndex]
    : currentModule?.lectures?.[currentLectureIndex];

  if (!currentLecture) {
    toast.error("Lecture not found");
    return;
  }

  try {
    // Mark lecture as viewed
    const moduleInProgress = findModuleInProgress(currentModule);
    if (!moduleInProgress) {
      toast.error("Progress tracking error");
      return;
    }

    const response = await setLectureAsViewed(
      userInfo.userId, 
      params.id, 
      moduleInProgress.moduleId,
      isInSubModule ? currentSubModule._id : null,
      currentLecture._id
    );

    if (response.success) {
      toast.success("Lecture completed!");
      setProgress(response);

      // Find next lecture
      let foundNextLecture = null;
      const getFirstLecture = (module) => 
        module.lectures?.[0] || module.subModules?.[0]?.lectures?.[0];

      if (isInSubModule) {
        if (currentLectureIndex < currentSubModule.lectures.length - 1) {
          foundNextLecture = currentSubModule.lectures[currentLectureIndex + 1];
        } else if (currentSubModuleIndex < currentModule.subModules.length - 1) {
          foundNextLecture = currentModule.subModules[currentSubModuleIndex + 1]?.lectures?.[0];
        } else {
          foundNextLecture = getFirstLecture(studentViewCourseDetails.modules[currentModuleIndex + 1]);
        }
      } else {
        if (currentLectureIndex < currentModule.lectures.length - 1) {
          foundNextLecture = currentModule.lectures[currentLectureIndex + 1];
        } else {
          foundNextLecture = getFirstLecture(studentViewCourseDetails.modules[currentModuleIndex + 1]);
        }
      }

      if (!foundNextLecture) {
        toast.success("Course completed!");
        navigate(-1);
        return;
      }

      // Show description if current lecture has one
      if (currentLecture.description) {
        setNextLecture(foundNextLecture);
        setShowDescription(true);
      } else {
        handleVideoSelect(foundNextLecture.videoUrl, foundNextLecture.title,
          diffDays < studentViewCourseDetails.level && !foundNextLecture?.freePreview);
      }
    }
  } catch (error) {
    console.error("Progress update failed:", error);
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
  let foundLecture = null;
  
  studentViewCourseDetails?.modules?.forEach(module => {
    // Check direct lectures
    module.lectures?.forEach(lecture => {
      if (lecture.title === title) foundLecture = lecture;
    });
    
    // Check submodule lectures
    module.subModules?.forEach(subModule => {
      subModule.lectures?.forEach(lecture => {
        if (lecture.title === title) foundLecture = lecture;
      });
    });
  });

  setCurrentLecture(foundLecture);

  // Rest of your existing code
  if (isLocked) {
    onOpen(MODAL_TYPE.LEVEL_MODAL);
    return;
  }

  if (foundLecture?.freePreview) {
    setSelectedVideo(videoUrl);
    setSelectedTitle(title);
    setVideoProgress(0);
    return;
  }

  if(status === "off") {
    onOpen(MODAL_TYPE.LIMITATION_MODAL);
    return;
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
    {showDescription ? (
  <div className="absolute inset-0 flex flex-col bg-black p-6 text-white overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4">
      {currentLecture?.title || 'Lecture'} Description
    </h2>
    <pre className="whitespace-pre-wrap font-sans text-gray-300">
      {currentLecture?.description || "No description available"}
    </pre>
    <button
              onClick={handleNextLecture}
              disabled={!showNextButton}
              className={`w-full md:w-auto px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                showNextButton
                  ? "bg-[#F7B955] hover:bg-[#F7B955]/90 text-black"
                  : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
              }`}
            >
              {showDescription 
                ? "Continue to Next Lecture"
                : isLastLecture() 
                  ? "End Course" 
                  : "Next Lecture"}
            </button>
  </div>
) : selectedVideo ? (
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
              onClick={handleNextLecture}
              disabled={!showNextButton}
              className={`w-full md:w-auto px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                showNextButton
                  ? "bg-[#F7B955] hover:bg-[#F7B955]/90 text-black"
                  : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
              }`}
            >
              {showDescription 
                ? "Continue to Next Lecture"
                : isLastLecture() 
                  ? "End Course" 
                  : "Next Lecture"}
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
                          <span className="flex-1 text-sm truncate flex flex-col">{lecture.title}
                          {lecture.descriptionTitle && <span className="flex-1 text-sm truncate text-white font-semibold">{lecture.descriptionTitle}</span>}
                          </span>
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