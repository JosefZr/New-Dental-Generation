import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Header() {
    const navigate = useNavigate()
    return (
        <header className="flex items-center p-4 border-b relative" style={{flexDirection:"row", justifyContent:"space-between"}}>
            <div className="flex items-center space-x-4 ">
                <Link to="/chat" className="flex items-center hover:text-my-beige transition-all">
                    <GraduationCap className="h-8 w-8 mr-4  bg-my-dark-blue"/>
                    <span className="font-extrabold md:text-xl text-[14px]">LMS LEARN</span>
                </Link>
                <div className="flex items-center space-x-1 ">
                    <Button variant="ghost"  className="text-[14px] md:rxt-[16px] font-medium bg-zinc-800">
                        Explore Course
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-3">
                        <span className="font-extrabold md:text-xl text-[14px] ">MY Courses</span>
                        <TvMinimalPlay className="w-8 h-8 cursor-pointer"/>
                    </div>
                    <Button 
                        className="bg-zinc-800 hover:bg-white hover:text-my-black"
                        // onClick={navigate("/chat")}
                    >Sign Out</Button>
                </div>
            </div>
        </header>
    )
}
