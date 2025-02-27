"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { InstructorContext } from "@/context/InstructorContext"
import ReactPlayer from "react-player"
import { useContext } from "react"

export default function CourseCurriculum() {
  const { courseCurriculmFormData, setCourseCurriculmFormData } = useContext(InstructorContext)

  // Add new module
  function handleAddModule() {
    setCourseCurriculmFormData([
      ...courseCurriculmFormData,
      {
        title: `Module ${courseCurriculmFormData.length + 1}`,
        subModules: [
          {
            title: "module 1",
            lectures: [{ title: "", videoUrl: "", freePreview: false }],
          },
        ],
      },
    ])
  }

  // Add sub-module to a module
  function handleAddSubModule(moduleIndex) {
    const updatedModules = courseCurriculmFormData.map((module, index) =>
      index === moduleIndex
        ? {
            ...module,
            subModules: [
              ...module.subModules,
              {
                title: `Sub-module ${module.subModules.length + 1}`,
                lectures: [{ title: "", videoUrl: "", freePreview: false }],
              },
            ],
          }
        : module,
    )
    setCourseCurriculmFormData(updatedModules)
  }

  // Add lecture to specific sub-module
  function handleAddLecture(moduleIndex, subModuleIndex) {
    const updatedModules = courseCurriculmFormData.map((module, modIdx) => {
      if (modIdx === moduleIndex) {
        const updatedSubModules = module.subModules.map((subModule, subIdx) =>
          subIdx === subModuleIndex
            ? {
                ...subModule,
                lectures: [...subModule.lectures, { title: "", videoUrl: "", freePreview: false }],
              }
            : subModule,
        )
        return { ...module, subModules: updatedSubModules }
      }
      return module
    })
    setCourseCurriculmFormData(updatedModules)
  }

  // Handle module title change
  function handleModuleTitleChange(event, moduleIndex) {
    const updatedModules = courseCurriculmFormData.map((module, index) =>
      index === moduleIndex ? { ...module, title: event.target.value } : module,
    )
    setCourseCurriculmFormData(updatedModules)
  }

  // Handle sub-module title change
  function handleSubModuleTitleChange(event, moduleIndex, subModuleIndex) {
    const updatedModules = courseCurriculmFormData.map((module, modIdx) => {
      if (modIdx === moduleIndex) {
        const updatedSubModules = module.subModules.map((subModule, subIdx) =>
          subIdx === subModuleIndex ? { ...subModule, title: event.target.value } : subModule,
        )
        return { ...module, subModules: updatedSubModules }
      }
      return module
    })
    setCourseCurriculmFormData(updatedModules)
  }

  // Handle lecture field changes
  function handleLectureChange(moduleIndex, subModuleIndex, lectureIndex, field, value) {
    const updatedModules = courseCurriculmFormData.map((module, modIdx) => {
      if (modIdx === moduleIndex) {
        const updatedSubModules = module.subModules.map((subModule, subIdx) => {
          if (subIdx === subModuleIndex) {
            const updatedLectures = subModule.lectures.map((lecture, lectIdx) =>
              lectIdx === lectureIndex ? { ...lecture, [field]: value } : lecture,
            )
            return { ...subModule, lectures: updatedLectures }
          }
          return subModule
        })
        return { ...module, subModules: updatedSubModules }
      }
      return module
    })
    setCourseCurriculmFormData(updatedModules)
  }

  // Delete a lecture
  function handleDeleteLecture(moduleIndex, subModuleIndex, lectureIndex) {
    const updatedModules = courseCurriculmFormData.map((module, modIdx) => {
      if (modIdx === moduleIndex) {
        const updatedSubModules = module.subModules.map((subModule, subIdx) => {
          if (subIdx === subModuleIndex) {
            return {
              ...subModule,
              lectures: subModule.lectures.filter((_, lectIdx) => lectIdx !== lectureIndex),
            }
          }
          return subModule
        })
        return { ...module, subModules: updatedSubModules }
      }
      return module
    })
    setCourseCurriculmFormData(updatedModules)
  }

  // Delete a sub-module
  function handleDeleteSubModule(moduleIndex, subModuleIndex) {
    const updatedModules = courseCurriculmFormData.map((module, modIdx) => {
      if (modIdx === moduleIndex) {
        return {
          ...module,
          subModules: module.subModules.filter((_, subIdx) => subIdx !== subModuleIndex),
        }
      }
      return module
    })
    setCourseCurriculmFormData(updatedModules)
  }

  // Delete a module
  function handleDeleteModule(moduleIndex) {
    const updatedModules = courseCurriculmFormData.filter((_, modIdx) => modIdx !== moduleIndex)
    setCourseCurriculmFormData(updatedModules)
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
                <div className="flex gap-2">
                  <Button className="text-black" onClick={() => handleAddSubModule(moduleIndex)}>
                    Add Sub-module
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteModule(moduleIndex)}>
                    Delete Module
                  </Button>
                </div>
              </div>

              {module.subModules.map((subModule, subModuleIndex) => (
                <div key={subModuleIndex} className="border p-4 rounded-md mb-4 ml-4">
                  <div className="flex justify-between items-center mb-4">
                    <Input
                      value={subModule.title}
                      onChange={(e) => handleSubModuleTitleChange(e, moduleIndex, subModuleIndex)}
                      className="text-lg font-semibold w-auto"
                    />
                    <div className="flex gap-2">
                      <Button className="text-black" onClick={() => handleAddLecture(moduleIndex, subModuleIndex)}>
                        Add Lecture
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteSubModule(moduleIndex, subModuleIndex)}>
                        Delete Sub-module
                      </Button>
                    </div>
                  </div>

                  {subModule.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="border p-4 rounded-md mb-4 ml-8">
                      <div className="flex gap-4 items-center mb-4">
                        <h4 className="font-semibold">Lecture {lectureIndex + 1}</h4>
                        <Input
                          placeholder="Lecture title"
                          value={lecture.title}
                          onChange={(e) =>
                            handleLectureChange(moduleIndex, subModuleIndex, lectureIndex, "title", e.target.value)
                          }
                        />
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={lecture.freePreview}
                            style={lecture.freePreview ? { backgroundColor: "black" } : {}}
                            onCheckedChange={(value) =>
                              handleLectureChange(moduleIndex, subModuleIndex, lectureIndex, "freePreview", value)
                            }
                          />
                          <Label>Free Preview</Label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Description Title */}
                        <div className="space-y-2">
                          <Label>Description Title (Optional)</Label>
                          <Input
                            placeholder="Optional section title for description..."
                            value={lecture.descriptionTitle}
                            onChange={(e) =>
                              handleLectureChange(
                                moduleIndex,
                                subModuleIndex,
                                lectureIndex,
                                "descriptionTitle",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <Label>Description (Optional)</Label>
                          <Textarea
                            placeholder="Optional detailed description... (Supports line breaks)"
                            value={lecture.description}
                            onChange={(e) =>
                              handleLectureChange(
                                moduleIndex,
                                subModuleIndex,
                                lectureIndex,
                                "description",
                                e.target.value,
                              )
                            }
                            className="min-h-[100px]"
                          />
                        </div>

                        {/* Video URL */}
                        <div className="space-y-2">
                          <Label>Video URL *</Label>
                          <Input
                            type="url"
                            placeholder="Required video URL..."
                            value={lecture.videoUrl}
                            onChange={(e) =>
                              handleLectureChange(moduleIndex, subModuleIndex, lectureIndex, "videoUrl", e.target.value)
                            }
                          />
                        </div>

                        {lecture.videoUrl && (
                          <ReactPlayer url={lecture.videoUrl} controls width="100%" height="400px" className="mt-4" />
                        )}
                      </div>

                      <Button
                        variant="destructive"
                        className="mt-4"
                        onClick={() => handleDeleteLecture(moduleIndex, subModuleIndex, lectureIndex)}
                      >
                        Delete Lecture
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <Button onClick={handleAddModule} className="text-black">
            Add New Module
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

