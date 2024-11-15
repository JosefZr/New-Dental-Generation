// App.jsx
import { Routes, Route } from "react-router-dom";
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
import Chat1 from "./pages/chat/chat1";

import ChannelChat from "./components/chatComponents/ChannelChat";
import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <Routes>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/" element={<Intro />} />
      <Route path="/dentist" element={<Dentist />} />
      <Route path="/dental-lab" element={<DentalLab />} />
      <Route path="/dental-store" element={<DentalStore />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/chat" element={<Chat />}>
        <Route path="chat1" element={<Chat1 />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path=":serverId/:channelId" element={<ChannelChat />} />{" "}
        {/* Route for channels */}
      </Route>
    </Routes>
  );
}
