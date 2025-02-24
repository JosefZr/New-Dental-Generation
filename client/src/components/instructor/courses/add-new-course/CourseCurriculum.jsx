import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InstructorContext } from "@/context/InstructorContext";
import ReactPlayer from "react-player";
import { useContext } from "react";

export default function CourseCurriculum() {
  const { courseCurriculmFormData, setCourseCurriculmFormData } = useContext(InstructorContext);

  // Add new module
  function handleAddModule() {
    setCourseCurriculmFormData([
      ...courseCurriculmFormData,
      {
        title: `Module ${courseCurriculmFormData.length + 1}`,
        lectures: [{ title: "", videoUrl: "", freePreview: false }],
      },
    ]);
  }

  // Add lecture to specific module
  function handleAddLecture(moduleIndex) {
    const updatedModules = courseCurriculmFormData.map((module, index) => 
      index === moduleIndex ? {
        ...module,
        lectures: [...module.lectures, { title: "", videoUrl: "", freePreview: false }]
      } : module
    );
    setCourseCurriculmFormData(updatedModules);
  }

  // Handle module title change
  function handleModuleTitleChange(event, moduleIndex) {
    const updatedModules = courseCurriculmFormData.map((module, index) =>
      index === moduleIndex ? { ...module, title: event.target.value } : module
    );
    setCourseCurriculmFormData(updatedModules);
  }

  // Handle lecture field changes
  function handleLectureChange(moduleIndex, lectureIndex, field, value) {
    const updatedModules = courseCurriculmFormData.map((module, modIdx) => {
      if (modIdx === moduleIndex) {
        const updatedLectures = module.lectures.map((lecture, lectIdx) => 
          lectIdx === lectureIndex ? { ...lecture, [field]: value } : lecture
        );
        return { ...module, lectures: updatedLectures };
      }
      return module;
    });
    setCourseCurriculmFormData(updatedModules);
  }

  // Delete a lecture
  function handleDeleteLecture(moduleIndex, lectureIndex) {
    const updatedModules = courseCurriculmFormData.map((module, modIdx) => 
      modIdx === moduleIndex ? {
        ...module,
        lectures: module.lectures.filter((_, lectIdx) => lectIdx !== lectureIndex)
      } : module
    );
    setCourseCurriculmFormData(updatedModules);
  }

  // Delete a module
  function handleDeleteModule(moduleIndex) {
    const updatedModules = courseCurriculmFormData.filter((_, modIdx) => modIdx !== moduleIndex);
    setCourseCurriculmFormData(updatedModules);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courseCurriculmFormData.map((module, moduleIndex) => (
            <div key={moduleIndex} className="border p-5 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <Input
                  value={module.title}
                  onChange={(e) => handleModuleTitleChange(e, moduleIndex)}
                  className="text-xl font-bold w-auto"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteModule(moduleIndex)}
                >
                  Delete Module
                </Button>
              </div>

              {module.lectures.map((lecture, lectureIndex) => (
                <div key={lectureIndex} className="border p-4 rounded-md mb-4">
                  <div className="flex gap-4 items-center mb-4">
                    <h4 className="font-semibold">Lecture {lectureIndex + 1}</h4>
                    <Input
                      placeholder="Lecture title"
                      value={lecture.title}
                      onChange={(e) => handleLectureChange(
                        moduleIndex,
                        lectureIndex,
                        'title',
                        e.target.value
                      )}
                    />
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={lecture.freePreview}
                        style={lecture.freePreview?{ backgroundColor: "black" }:{}}

                        onCheckedChange={(value) => handleLectureChange(
                          moduleIndex,
                          lectureIndex,
                          'freePreview',
                          value
                        )}
                      />
                      <Label>Free Preview</Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input
                      type="url"
                      placeholder="Video URL"
                      value={lecture.videoUrl}
                      onChange={(e) => handleLectureChange(
                        moduleIndex,
                        lectureIndex,
                        'videoUrl',
                        e.target.value
                      )}
                    />
                    {lecture.videoUrl && (
                      <ReactPlayer
                        url={lecture.videoUrl}
                        controls
                        width="100%"
                        height="400px"
                      />
                    )}
                  </div>

                  <Button
                    variant="destructive"
                    className="mt-4"
                    onClick={() => handleDeleteLecture(moduleIndex, lectureIndex)}
                  >
                    Delete Lecture
                  </Button>
                </div>
              ))}

              <Button
                className="mt-4 text-black"
                onClick={() => handleAddLecture(moduleIndex)}
              >
                Add Lecture
              </Button>
            </div>
          ))}

          <Button onClick={handleAddModule} className="text-black">
            Add New Module
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}