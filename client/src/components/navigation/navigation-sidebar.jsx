import { ActionNavigation } from ".";
import {Separator} from "@/components/ui/separator"
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./NavigationItem";
import { IoChatbubblesOutline } from "react-icons/io5";
import { SiWorldhealthorganization } from "react-icons/si";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { ModalProvider } from "../providers/modal-provider";

export default function NavigationSidebar() {
    const servers = [
        { 
            id:"chat1",
            name: "dental lab" ,
            imageUrl:<BsFillPersonVcardFill className="object-cover w-full h-full"/>
        },
        { 
            id:"chat2",
            name: "dental store" ,
            imageUrl:<SiWorldhealthorganization className="object-cover w-full h-full"/>
        },
        { 
            id:"chat3",
            name: "dentist" ,
            imageUrl:<IoChatbubblesOutline className="object-cover w-full h-full"/>
        }
    ];

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-my-white-gray w-full bg-my-dark-blue py-6">
            <ActionNavigation />
            <Separator className="h-[2px] bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server, index) => (
                    <div key={index} >
                        <NavigationItem 
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className=" pb-3 mt-auto items-center flex-row gap-Y-4">
                <ModalProvider>
                    
                </ModalProvider>
            </div>
        </div>
    );
}
