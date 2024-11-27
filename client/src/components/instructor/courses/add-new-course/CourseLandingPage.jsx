import FormControls from "@/components/formControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstructorContext } from "@/context/InstructorContext";
import { courseLandingPageFormControls } from "@/lib/default";
import { useContext } from "react";

export default function CourseLandingPage() {
  const {courseLandingFormData, setCourseLandingFormData}=useContext(InstructorContext)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <FormControls 
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  )
}
