import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/InstructorContext";
import { mediaUploadService } from "@/services";
import { useContext } from "react";

export default function CourseSetting() { 
  const {courseLandingFormData, setCourseLandingFormData}=useContext(InstructorContext)
  async function handleImageUploadChange(event){
    const SelectedImage = event.target.files[0];
    // if(SelectedImage){
    //   const imageFormData = new FormData();
    //   imageFormData.append('file', SelectedImage);
    //   try {
    //     const response = await mediaUploadService(imageFormData)
    //     console.log(response,"response");
    //     if(response.success){
    //       setCourseLandingFormData({
    //         ...courseLandingFormData,
    //         image:response.data.url
    //       })
    //     }
    //     console.log(response)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    if (SelectedImage) {
      // Use a placeholder image instead of uploading to Cloudinary
      const placeholderUrl = "https://via.placeholder.com/300x200?text=Course+Image";
      setCourseLandingFormData({
        ...courseLandingFormData,
        image: placeholderUrl,
      });
      console.log("Using placeholder image:", placeholderUrl);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {
        courseLandingFormData?.image 
          ? 
          <img src={courseLandingFormData.image}/>
          :
          <div className=" flex flex-col gap-3">
          <Label>Upload Course Image</Label>
          <Input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={handleImageUploadChange}
          />
        </div>
        }
      </CardContent>
    </Card>
  )
}
