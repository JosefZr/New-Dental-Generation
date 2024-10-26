import { ScrollArea } from "../ui/scroll-area";
import ServerChannel from "./ServerChannel";
import Serverheader from "./Serverheader";
import ServerMember from "./ServerMember";
import ServerSection from "./ServerSection";

export default function ServerSideBar({serverId}) {
  return (
    <div className=" flex flex-col h-full text-my-white w-full bg-my-dark">
        <Serverheader 
        // server={} role={"ADMIN"}
        />
        <ScrollArea>
          {/* {!!textChannels?.length &&( */}
          <div className="mx-2">
            <ServerSection 
              sectionType="channels"
              channelType="text"
              role="admin"
              label="Text channel"
            />
            {/* {texxtChannels.map((channel)=>( */}
              <ServerChannel key="" channel="generale" memberRole=""/>
              <ServerChannel key="" channel="test" memberRole=""/>
            {/* ))} */}
          </div>
          {/* )} */}

          {/* {!!audioChannels?.length &&( */}
          <div className="mx-2">
            <ServerSection 
              sectionType="channels"
              channelType="audio"
              role="admin"
              label="audio channel"
            />
            {/* {texxtChannels.map((channel)=>( */}
              <ServerChannel key="" channel="generale" memberRole=""/>
              <ServerChannel key="" channel="test" memberRole=""/>
            {/* ))} */}
          </div>
          {/* )} */}

          {/* {!!videoChannels?.length &&( */}
          <div className="mx-2">
            <ServerSection 
              sectionType="channels"
              channelType="video"
              role="admin"
              label="video channel"
            />
            {/* {texxtChannels.map((channel)=>( */}
              <ServerChannel key="" channel="generale" memberRole=""/>
              <ServerChannel key="" channel="test" memberRole=""/>
            {/* ))} */}
          </div>
          {/* )} */}

          {/* {!!members?.length &&( */}
          <div className="mx-2">
            <ServerSection 
              sectionType="channels"
              channelType="video"
              role="admin"
              label="members"
            />
            {/* {texxtChannels.map((member)=>( */}
              <ServerMember key="" member="youyou" server=""/>
            {/* ))} */}
          </div>
          {/* )} */}
        </ScrollArea>
    </div>
  )
}
