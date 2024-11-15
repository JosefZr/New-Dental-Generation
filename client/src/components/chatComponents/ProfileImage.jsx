
export default function ProfileImage({image}) {
  return (
    <section className="flex-shrink-0 rounded-full bg-base-300 relative cursor-pointer" style={{width:"40px", height:"40px"}}>
        <img src={image} alt="profile image"  width="40px" height="40px" loading="lazy"/>
    </section>
  )
}
