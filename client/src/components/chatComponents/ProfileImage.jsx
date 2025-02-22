import BigProfileLogo from "../BigProfileLogo";

// eslint-disable-next-line react/prop-types
export default function ProfileImage({image}) {
  return (
    <div className="h-[50px] w-[50px] rounded-full cursor-pointer">
      <BigProfileLogo image={image}/>
    </div>
    
  )
}
