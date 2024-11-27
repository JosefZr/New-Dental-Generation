import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InstructorContext } from "@/context/InstructorContext";
import { courseCurriculumInitialFormData } from "@/lib/default";
import ReactPlayer from "react-player"; // Import ReactPlayer
import { useContext } from "react";

export default function CourseCurriculum() {
  const {
    courseCurriculmFormData,
    setCourseCurriculmFormData,
  } = useContext(InstructorContext);

  function handleNewLecture() {
    setCourseCurriculmFormData([
      ...courseCurriculmFormData,
      {
        ...courseCurriculumInitialFormData,
      },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculmFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculmFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculmFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculmFormData(cpyCourseCurriculumFormData);
  }

  function handleYouTubeUrlChange(event, currentIndex) {
    const url = event.target.value;

    let cpyCourseCurriculumFormData = [...courseCurriculmFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      videoUrl: url, // Keep the raw URL for ReactPlayer
    };

    setCourseCurriculmFormData(cpyCourseCurriculumFormData);
  }

  function handleDeleteLecture(indexToDelete) {
    const updatedLectures = courseCurriculmFormData.filter(
      (_, index) => index !== indexToDelete
    );
    setCourseCurriculmFormData(updatedLectures);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          className="ml-4 space-y-4"
          onClick={handleNewLecture}
          style={{ backgroundColor: "black" }}
        >
          Add Lecture
        </Button>
        <div className="mt-4">
          {courseCurriculmFormData.map((curriculm, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculmFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculmFormData[index]?.freePreview}
                    style={courseCurriculmFormData[index]?.freePreview?{ backgroundColor: "black" }:{}}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Card>
                  <Input
                    type="url"
                    placeholder="Enter video URL"
                    value={courseCurriculmFormData[index]?.videoUrl}
                    onChange={(event) => handleYouTubeUrlChange(event, index)}
                  />
                  {courseCurriculmFormData[index]?.videoUrl && (
                    <div className="mt-4">
                      <ReactPlayer
                        url={courseCurriculmFormData[index].videoUrl}
                        controls
                        width="100%"
                        height="calc(37vw)" // Adjusted height for better visibility
                        className="react-player"
                      />
                    </div>
                  )}
                </Card>
                <Button
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => handleDeleteLecture(index)} // Delete functionality
                >
                  Delete Lecture
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
