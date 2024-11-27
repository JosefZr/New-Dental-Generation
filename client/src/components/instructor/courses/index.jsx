/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InstructorContext } from "@/context/InstructorContext";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/lib/default";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteCourseByIdService } from "@/services";
import { toast } from "react-hot-toast";

export default function InstructorCourses({ ListOfCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculmFormData,
  } = useContext(InstructorContext);

  const [courses, setCourses] = useState(ListOfCourses); // Local state for courses
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCourseByIdService(selectedCourse);
      toast.success("Course deleted successfully");
      // Update the local state to remove the deleted course
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== selectedCourse)
      );
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete the course");
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-3xl font-extrabold">All courses</CardTitle>
          <Button
            className="p-6 bg-my-dark-blue hover:bg-slate-800"
            onClick={() => {
              setCurrentEditedCourseId(null);
              setCourseCurriculmFormData(courseCurriculumInitialFormData);
              setCourseLandingFormData(courseLandingInitialFormData);
              navigate("create-new-course");
            }}
          >
            Create New Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A list of your recent courses.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses && courses.length > 0
                  ? courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">
                          {course?.title}
                        </TableCell>
                        <TableCell>{course?.students.length}</TableCell>
                        <TableCell>
                          {new Date(course?.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate(`/instructor/edit-course/${course._id}`)
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedCourse(course._id);
                              setIsModalOpen(true);
                            }}
                          >
                            <Delete className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-900 border-none">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the course {selectedCourse?.title}?
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
