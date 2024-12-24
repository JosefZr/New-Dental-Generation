// App.jsx
import { Routes, Route } from "react-router-dom";
import { SocketProvider } from "./socketContext";
import {
  Chat,
  DentalLab,
  DentalStore,
  Dentist,
  Intro,
  Login,
  Signup,
  SuccessPage,
} from "./pages";

import ChannelChat from "./components/chatComponents/ChannelChat";
import Dashboard from "./pages/Dashboard";
import Instructor from "./pages/Instructor";
import AddNewCourse from "./pages/AddNewCourse";
import StudentViewCommonLayout from "./pages/StudentView";
import StudentViewCourseDetailsPage from "./pages/course-details";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Friends from "./pages/Friends";
import UserChat from "./pages/chat/UserChat";

export default function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/instructor" element={<Instructor/>}/>
        <Route path="/instructor/create-new-course" element={<AddNewCourse/>}/>
        <Route path="/instructor/edit-course/:courseId" element={<AddNewCourse/>}/>
        <Route path="/course" element={<StudentViewCommonLayout/>}/>
        <Route path="/course/details/:id" element={<StudentViewCourseDetailsPage/>}/>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={<Intro />} />
        <Route path="/dentist" element={<Dentist />} />
        <Route path="/dental-lab" element={<DentalLab />} />
        <Route path="/dental-store" element={<DentalStore />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="friends" element={<Friends />}/>
          <Route path="userChat" element={<UserChat />} />
        </Route>
        <Route path="/profile/:id" element={<Profile />}/>
        <Route path="/users" element={<Users />}/>
        <Route path="/channels" element={<Chat />}>
          <Route path=":serverId/:channelId" element={<ChannelChat />} />{" "}
          {/* Route for channels */}
        </Route>
      </Routes>
    </SocketProvider>
  );
}
