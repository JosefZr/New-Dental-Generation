// import BigProfileLogo from "../BigProfileLogo";
import SmallProfileLogo from "../SmallProfileLogo";

// eslint-disable-next-line react/prop-types
export default function ProfileImage({image}) {
  return (
    <div className="h-[50px] w-[50px] rounded-full cursor-pointer">
      <SmallProfileLogo image={image}/>
    </div>
    
  )
}
