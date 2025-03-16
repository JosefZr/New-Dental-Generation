import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/InstructorContext";
import { useContext, useState, useRef } from "react";
import { ImageIcon, Upload, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CourseSetting() {
  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0];
    if (!selectedImage) {
      console.error("No image selected");
      return;
    }
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);
    
    // Add existing image filename to delete
    if (courseLandingFormData.image) {
      formData.append("oldFilename", courseLandingFormData.image);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/instructor/course/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("Uploaded Image Filename:", data.filename);

      setCourseLandingFormData((prevData) => ({
        ...prevData,
        image: data.filename,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

// Frontend: Update handleDeleteImage to call API
async function handleDeleteImage() {
  try {
    const filename = courseLandingFormData.image;
    if (!filename) return;

    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/instructor/course/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ filename }),
    });

    if (!response.ok) throw new Error("Delete failed");

    setCourseLandingFormData(prev => ({ ...prev, image: "" }));
  } catch (error) {
    console.error("Delete error:", error);
  }
}

  const imageUrl = courseLandingFormData?.image
    ? `${import.meta.env.VITE_SERVER_API}/uploads/course/${courseLandingFormData.image}`
    : null;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="course-image" className="text-base font-medium mb-2 block">
              Course Image
            </Label>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg border bg-background aspect-video flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl || "/signLogo.jpg"}
                    alt="Course preview"
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground h-full w-full p-6">
                    <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                    <p className="text-sm text-center">No image uploaded yet</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload a high-quality image to make your course stand out. Recommended size: 1280×720 pixels (16:9 ratio).
                </p>

                <div className="flex flex-col gap-3">
                  <Input
                    ref={fileInputRef}
                    id="course-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUploadChange}
                  />

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="flex-1">
                      {isUploading ? "Uploading..." : imageUrl ? "Update Image" : "Browse Image"}
                    </Button>

                    {imageUrl && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="text-my-black">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Course Image</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this course image? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteImage} className="bg-my-black hover:bg-my-dark-blue">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
