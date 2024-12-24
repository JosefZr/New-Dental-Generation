import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/InstructorContext";
import { useContext } from "react";

export default function CourseSetting() {
  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext);

  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0];
    if (!selectedImage) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/instructor/course/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("token"), // Add the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("Uploaded Image Filename:", data.filename);

      // Update the context state with the uploaded image filename
      setCourseLandingFormData((prevData) => ({
        ...prevData,
        image: data.filename,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {courseLandingFormData?.image ? (
          <img
            src={`http://localhost:3000/course/${courseLandingFormData.image}`} // Correct image path
            alt="Uploaded Course"
          />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={handleImageUploadChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
