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

import Dashboard from "./pages/Dashboard";
import Instructor from "./pages/Instructor";
import AddNewCourse from "./pages/AddNewCourse";
import StudentViewCommonLayout from "./pages/StudentView";
import StudentViewCourseDetailsPage from "./pages/course-details";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Friends from "./pages/Friends";
import UserChat from "./pages/chat/UserChat";
import DentalStuff from "./pages/DentalStuff";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignupAdmins from "./pages/SignupAmins";
import Quotes from "./pages/Quotes";

export default function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/instructor" element={<Instructor/>}/>
          <Route path="/instructor/create-new-course" element={<AddNewCourse/>}/>
          <Route path="/instructor/edit-course/:courseId" element={<AddNewCourse/>}/>
          <Route path="/course" element={<StudentViewCommonLayout/>}/>
          <Route path="/course/details/:id" element={<StudentViewCourseDetailsPage/>}/>

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="friends" element={<Friends />}/>
            <Route path="userChat" element={<UserChat />} />
            <Route path="dental-stuff" element={<DentalStuff/>}/>
            <Route path="quotes" element={<Quotes/>}/>
            <Route path="user-chat" element={<UserChat/>}/>
          </Route>
          
          <Route path="/profile/:id" element={<Profile />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/channels" element={<Chat />}/>
          <Route path="/chat2/*" element={<Chat />} />
          <Route path="/chat3/*" element={<Chat />} />
          <Route path="/growth-support/*" element={<Chat />} />
          <Route path="/top-dentist-opportunity/*" element={<Chat />} />
          <Route path="/job-opportunities/*" element={<Chat/>}/>
          <Route path="/sunnah/*" element={<Chat/>}/>

        </Route>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={<Intro />} />
        <Route path="/dentist" element={<Dentist />} />
        <Route path="/dental-lab" element={<DentalLab />} />
        <Route path="/dental-store" element={<DentalStore />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/macha" element={<SignupAdmins />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
    </SocketProvider>
  );
}
