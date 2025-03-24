
import { useContext } from "react";
import { CoursesContext } from "@/context/CoursesContext";
import { useFavorite } from "@/hooks/courses/useFavorite";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

export const FavButton = () => {
  const { allProgress, setAllProgress } = useContext(CoursesContext);
  const userInfo = useAuthUser();
  const favMutation = useFavorite();
  const params = useParams()

  const isFavorite = allProgress?.data
    ?.find((prog) => prog.courseId === params.id)
    ?.moduleProgress?.flatMap((m) => m.subModules)
    ?.flatMap((sm) => sm.lectures)
    ?.find((l) => l.lectureId === params.lectureId)?.isFavorite || false;

  const handleFavorite = (e) => {
    e.preventDefault();
    if (!params.lectureId || !params.id) return;

    const previousProgress = allProgress.data;
    
    // Optimistically update UI
    const updatedProgress = previousProgress.map((courseProg) => {
      if (courseProg.courseId === params.id) {
        return {
          ...courseProg,
          moduleProgress: courseProg.moduleProgress.map((module) => ({
            ...module,
            subModules: module.subModules.map((subModule) => ({
              ...subModule,
              lectures: subModule.lectures.map((l) =>
                l.lectureId === params.lectureId
                  ? { ...l, isFavorite: !l.isFavorite }
                  : l
              ),
            })),
          })),
        };
      }
      return courseProg;
    });

    setAllProgress((prev) => ({ ...prev, data: updatedProgress }));

    // Send mutation
    favMutation.mutate(
      {
        userId: userInfo.userId,
        courseId:params.id,
        lectureId: params.lectureId,
      },
      {
        onError: () => {
          setAllProgress((prev) => ({ ...prev, data: previousProgress }));
          toast.error("Failed to update favorite");
        },
      }
    );
  };

  return (
    <button onClick={handleFavorite} className="p-1 text-xl hover:bg-slate-700 rounded-full transition-all ">
      {isFavorite ? (
        <IoBookmark className="text-my-gold " />
      ) : (
        <IoBookmarkOutline  className="text-gray-400" />
      )}
    </button>
  );
};