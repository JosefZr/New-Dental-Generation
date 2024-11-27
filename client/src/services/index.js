import axiosInstance from "@/api/axiosInstance";

export async function mediaUploadService(formData, onProgressCallback) {
    const { data } = await axiosInstance.post("http://localhost:3000/api/v1/media/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgressCallback(percentCompleted);
      },
    });
  
    return data;
  }

  export async function fetchInstructorCourseListService(){
    const {data} = await axiosInstance.get("/api/v1/instructor/course/get")
    return data
  }
  export async function addNewCourseService(fromData){
    const {data} = await axiosInstance.post("/api/v1/instructor/course/add",fromData)
    return data
  }
  export async function fetchInstructorCourseDetailsService(id){
    const {data} = await axiosInstance.get(`/api/v1/instructor/course/get/details/${id}`)
    return data
  }
  export async function updateCourseByIdService(id, formData){
    const {data} = await axiosInstance.put(`/api/v1/instructor/course/update/${id}`,formData)
    return data
  }
  export async function deleteCourseByIdService(id) {
    const { data } = await axiosInstance.delete(`/api/v1/instructor/course/delete`, {
        data: { id }, // Pass the id in the data object
    });
    return data;
}


export async function fetchStudentCourseListService(){
  const {data} = await axiosInstance.get("/api/v1/student/course/get")
  return data
}

export async function fetchStudentCourseDetailsService(courseId){
  const {data} = await axiosInstance.get(`/api/v1/student/course/get/details/:${courseId}`)
  return data
}