import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function NavigationItem({ id, imageUrl }) {
  const location = useLocation(); // Get the current location
  const isActive = location.pathname.includes(`/${id}`); // Check if the current path includes the id

  return (
    <Link to={`/${id}`}>
      <button className="group relative flex items-center hover:bg-slate-900 py-3">
        {/* Highlight the active item */}
        <div
          className={cn(
            "absolute left-0 bg-my-white rounded-r-full transition-all w-[4px]",
            isActive ? "h-[8px] group-hover:h-[20px]" : ""
          )}
        />
        <div
          className={cn(
            "relative flex mx-3 h-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            isActive ? "bg-my-white/10" : "bg-transparent rounded-[16px]"
          )}
        >
          {/* Image/Background */}
          <div className={`${isActive ? " opacity-100":"" }opacity-60 object-cover w-full h-full text-my-beige `}>
            {imageUrl}
          </div>
        </div>
      </button>
    </Link>
  );
}
