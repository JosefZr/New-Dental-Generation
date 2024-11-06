// App.jsx
import { Routes, Route } from 'react-router-dom';
import { Chat, DentalLab, DentalStore, Dentist, Intro, Login, Signup } from './pages';
import Chat1 from './pages/chat/chat1';
import Chat2 from './pages/chat/chat2';
import Chat3 from './pages/chat/chat3';
import ChannelChat from './components/chatComponents/ChannelChat';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/dentist" element={<Dentist />} />
      <Route path="/dental-lab" element={<DentalLab />} />
      <Route path="/dental-store" element={<DentalStore />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/chat" element={<Chat />}>
        <Route path="chat1" element={<Chat1 />} />
        <Route path="chat2" element={<Chat2 />} />
        <Route path="chat3" element={<Chat3 />} />
         <Route path=":serverId/:channelId" element={<ChannelChat />} /> {/* Route for channels */}
      </Route>
    </Routes>
  );
}
