import { Card, CardContent } from '@/components/ui/card'
import { CoursesContext } from '@/context/CoursesContext';
import { setLectureAsViewed } from '@/services';
import { jwtDecode } from 'jwt-decode';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';

export default function Video({setSelectedTitle,selectedTitle ,isFreeUser}) {
    const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
    const [videoProgress, setVideoProgress] = useState(0); // Track video progress
    const [showNextButton, setShowNextButton] = useState(false); // Show "Next Lecture" button
    const { studentViewCourseDetails} = useContext(CoursesContext);
    const userInfo = jwtDecode(localStorage.getItem("token"));
    const params = useParams();
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

    const  handleNextLecture = async() => {
        // Update student's current course progress
        
        const currentIndex = studentViewCourseDetails.curriculum.findIndex(
            (curr) => curr.title === selectedTitle
        );
        if (currentIndex >= 0 && currentIndex < studentViewCourseDetails.curriculum.length - 1) {
            const nextLecture = studentViewCourseDetails.curriculum[currentIndex + 1];
            try {
                // Call API to mark the current lecture as viewed
                const response = await setLectureAsViewed(
                    userInfo.userId, // Ensure it's a string
                    params.id,    // Ensure it's a string
                    nextLecture._id
                )
                if (response.success) {
                    toast.success("Lecture marked as viewed.");
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
            toast.info("You've reached the last lecture.");
        }
    };
return (
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
                                className={`mt-4 px-4 py-2 bg-my-green text-black bg-my-white rounded-lg ${!showNextButton ?"cursor-not-allowed opacity-50":""}`}
                            >
                                Next Lecture
                            </button>
                        
                    </div>
                ) : (
                    <p className="text-my-white">Select a video to watch.</p>
                )}
            </CardContent>
        </Card>
    </aside>
    )
}
