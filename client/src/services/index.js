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
  const {data} = await axiosInstance.get(`/api/v1/student/course/get/details/${courseId}`)
  return data
} 

export async function addUserToCourse(id, firstName,email,params){
  const payload={
    userId:id,
    firstName:firstName,
    email:email,
    courseId:params
  }
  const {data} = await axiosInstance.post("/api/v1/instructor/course/setUserToCourse",payload)
  return data
}

export async function fetchStudentCourseProgressionDetails(userId, courseId) {
  const { data } = await axiosInstance.post(`/api/v1/student/progression/get`,{ userId, courseId })
  return data;
}
export async function uploadCourseImage(image){
  const formData = new FormData()
  formData.append('image' , image)
  const { data } = await axiosInstance.post("/api/v1/instructor/course/upload/CourseImage", {formData}, {
    headers: {
        "Content-Type": "multipart/form-data", // Set the correct content type
    },
  });
  return data
}
export async function fetchStudentCourseProgression(userId) {
  const { data } = await axiosInstance.post(`/api/v1/student/progression/getAll`,{ userId })
  return data;
}
export async function updateLectureProgress(userId, courseId, lectureId) {
  try {
      const response = await axiosInstance.patch(`/api/v1/student/progression/update`, {
          userId,
          courseId,
          lectureId,
      });
      return response.data;
  } catch (error) {
      console.error("Error updating lecture progress:", error);
      throw error;
  }
}
export async function setLectureAsViewed(userId,courseId,lectureId){
  const {data} = await axiosInstance.patch("/api/v1/student/progression/setLectureViewed",{userId,courseId,lectureId})
  return data;
}

export async function updateUsername(userId,firstName,lastName){
  const {data} = await axiosInstance.put("/api/v1/auth/update/username",{userId,firstName,lastName})
  return data
}
export async function updateEmail(userId,email){
  const {data} = await axiosInstance.put("/api/v1/auth/update/email",{userId,email})
  return data
}
export async function updatePassword(userId,previewsPassword,newPassword){
  const {data} = await axiosInstance.put("/api/v1/auth/update/password",{userId,previewsPassword,newPassword})
  return data
}
export async function updateDescription(userId,bio){
  const {data} = await axiosInstance.put("/api/v1/auth/update/description",{userId,bio})
  return data
}
export async function uploadAvatar(image){
  const formData = new FormData()
  formData.append('image' , image)
  const { data } = await axiosInstance.post("/api/v1/auth/upload/avatar", {formData}, {
    headers: {
        "Content-Type": "multipart/form-data", // Set the correct content type
    },
  });
  return data
}
export async function getUsers(){
  const {data} = await axiosInstance.get("/api/v1/auth/getAll/users");
  return data
}

export async function deleteUser(id) {
  const { data } = await axiosInstance.delete(`/api/v1/auth/delete/user`, {
      params: { id }
  });
  return data;
}


export async function createStoreAndLabChannel(values){
  const {data} = await axiosInstance.post("/api/v1/channel/single/create",{values})
  return data;
}

export async function getUserById(userId){
  const {data} = await axiosInstance.get(`/api/v1/users/${userId}`)
  return data
}


//start friends api calls
export async function addingFriendRequest(senderId, receiverId) {
  const { data } = await axiosInstance.post("/api/v1/friends/set", {
    senderId,
    receiverId
  })
  return data
}

export async function getFriendsRequest(senderId, receiverId){
  const {data} = await axiosInstance.post("/api/v1/friends/get", {
    senderId,
    receiverId
  })
  return data
}
export async function getAllPending(userId){
  const {data} = await axiosInstance.post(`/api/v1/friends/getAllPendings`,{userId});
  return data
}
export async function getAllReceived(userId){
  const {data} = await axiosInstance.post(`/api/v1/friends/getAllReceived`,{userId});
    return data
}
export async function deletePendingRequests(senderId, receiverId){
  const {data} = await axiosInstance.delete(
    `/api/v1/friends/deletePendings?senderId=${senderId}&receiverId=${receiverId}`
  )
  return data
}
export async function deleteFriend(id,senderId, receiverId){
  const {data} = await axiosInstance.delete(
    `/api/v1/friends/deleteReceivedRequests?senderId=${senderId}&receiverId=${receiverId}&id=${id}`
  )
  return data
}
export async function deleteFriendRequest(senderId, receiverId){
  const {data} = await axiosInstance.delete(
    `/api/v1/friends/deleteReceivedRequests?senderId=${senderId}&receiverId=${receiverId}`
  )
  return data
}
export async function acceptFriendRequest(senderId, receiverId){
  const {data} = await axiosInstance.post("/api/v1/friends/accept", {
    senderId, receiverId
  })
  return data
}