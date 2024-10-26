// src/pages/chat/ChannelChat.jsx
import { useParams } from "react-router-dom";

export default function ChannelChat() {
  const { serverId, channelId } = useParams();
  
  return (
    <div>
      <h2>Chat in {channelId} of {serverId}</h2>
      {/* Here you would add your chat UI */}
    </div>
  );
}
