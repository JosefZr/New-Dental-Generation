"use client"

import { LoadingSpinner } from "@/components/server/ServerSideBar"
import { CoursesContext } from "@/context/CoursesContext"
import { UserContext } from "@/context/UserContext"
import { fetchUserData } from "@/hooks/useFetchUserData"
import { setLectureAsViewed } from "@/services"
import { jwtDecode } from "jwt-decode"
import { CheckCircle, ChevronRight, Lock } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import ReactPlayer from "react-player"
import { useNavigate, useParams } from "react-router-dom"
import ProgressOfCourse from "./ProgressOfCourse"
import { useGetDaysDifference } from "@/hooks/courses/useGetDaysDiffrence"
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { useAuthUser } from "@/hooks/jwt/useAuthUser"

export default function LectureList() {
  const userInfo =useAuthUser()
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

  const diffDays = useGetDaysDifference(user.createdAt)

  const filteredLectures = studentViewCourseDetails?.curriculum?.filter((curr) =>
    curr.title.toLowerCase().includes(searchDeatiledCourse?.toLowerCase()),
  )

  const handleNextLecture = async () => {
    const currentIndex = studentViewCourseDetails.curriculum.findIndex((curr) => curr.title === selectedTitle);
  
    if (currentIndex >= 0 && currentIndex < studentViewCourseDetails.curriculum.length - 1) {
      const nextLecture = studentViewCourseDetails.curriculum[currentIndex + 1];
      const currentLecture = studentViewCourseDetails.curriculum[currentIndex];
  
      const isLocked = diffDays < studentViewCourseDetails.level && !nextLecture?.freePreview;
  
      if (isLocked) {
        // toast.error("the next lecture is locked.");
        onOpen(MODAL_TYPE.LEVEL_MODAL)
        return;
      }
  
      try {
        const response = await setLectureAsViewed(userInfo.userId, params.id, currentLecture._id);
        if (response.success) {
          toast.success("Lecture marked as viewed");
          setProgress(response);
        }
        handleVideoSelect(nextLecture.videoUrl, nextLecture.title, isLocked);
      } catch (error) {
        toast.error("Failed to update progress");
      }
    } else {
      const lastLecture = studentViewCourseDetails.curriculum[currentIndex];
      try {
        const response = await setLectureAsViewed(userInfo.userId, params.id, lastLecture._id);
        if (response.success) {
          toast.success("Course completed!");
          navigate(-1);
        }
      } catch (error) {
        toast.error("Failed to update progress");
      }
    }
  };
  

  const handleVideoSelect = (videoUrl, title, isLocked) => {
    const isFreeTrial = user.subscriptionPlan === "freeTrial";
    const hasSubscriptionExpired = new Date(user.subscriptionEndDate).getTime() < Date.now();
    const currentLecture = studentViewCourseDetails.curriculum.find(
      (curr) => curr.title === title
    );
  
    // Check if lecture is locked based on level requirements
    if (isLocked) {
      // toast.error("This content is locked");
      onOpen(MODAL_TYPE.LEVEL_MODAL)
      return;
    }
  
    // If it's a free preview lecture, allow access regardless of subscription
    if (currentLecture.freePreview) {
      setSelectedVideo(videoUrl);
      setSelectedTitle(title);
      setVideoProgress(0);
      return;
    }
  
    // For non-free preview lectures, check subscription status
    if (isFreeTrial) {
      onOpen(MODAL_TYPE.LIMITATION_MODAL)
      // toast.error("This lecture is only available for subscribed users");
      return;
    }
  
    if (hasSubscriptionExpired) {
      onOpen(MODAL_TYPE.LIMITATION_MODAL)
      return;
    }
  
    setSelectedVideo(videoUrl);
    setSelectedTitle(title);
    setVideoProgress(0);
  };

  const handleProgress = (progress) => {
    setVideoProgress(progress.played)
    if (progress.played >= 0.5 && !showNextButton) {
      setShowNextButton(true)
    }
  }

  if (loading) return <LoadingSpinner />

  const isFreeUser =
    free.subscriptionPlan === "freeTrial" && free.isPaid === false && new Date(free.trialEndDate).getTime() > Date.now()

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
                  onClick={handleNextLecture}
                  disabled={!showNextButton}
                  className={`w-full md:w-auto px-4 md:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showNextButton
                      ? "bg-[#F7B955] hover:bg-[#F7B955]/90 text-black"
                      : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {studentViewCourseDetails?.curriculum.findIndex((curr) => curr.title === selectedTitle) ===
                  studentViewCourseDetails.curriculum.length - 1
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

      {/* Sidebar - Lecture List */}
      <div className="w-full md:w-[380px] border-t md:border-t-0 md:border-l border-gray-800 bg-[#0A1720] overflow-hidden flex flex-col max-h-[50dvh] md:max-h-full">
        <div className="sticky top-0 z-10 bg-[#0A1720]">
          <ProgressOfCourse />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredLectures?.length > 0 ? (
            <div className="p-2 space-y-1">
              {filteredLectures.map((curr, index) => {
  const progressData = progress.data.lectureProgress.find((prog) => prog.lectureId === curr._id)
  const isLectureViewed = progressData?.viewed === true
  const isLocked = diffDays < studentViewCourseDetails.level && !curr?.freePreview
  const isActive = selectedTitle === curr.title

  return (
    <button
      key={index}
      onClick={() => {if (isLocked) {
        onOpen(MODAL_TYPE.LEVEL_MODAL)
      } else {
        handleVideoSelect(curr.videoUrl, curr.title, isLocked);
      }
    }}
      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
         isActive
            ? "bg-[#1E2A35] text-white"
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
              {index + 1}
            </div>
          )}
        </div>
        <span className="flex-1 text-sm truncate">{curr.title}</span>
        <ChevronRight className="h-4 w-4 text-gray-500" />
      </div>
    </button>
  )
})}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">No lectures available</div>
          )}
        </div>
      </div>
    </div>
  )
}

