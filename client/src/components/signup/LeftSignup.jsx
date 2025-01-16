import { FaKey } from "react-icons/fa6"
import { MdDone } from "react-icons/md"

const data = [
    { desc:"24/7 support and expert guidance"},
    { desc:"Specialized tools to streamline your dental business"},
    { desc:"Courses on advanced techniques, patient"},
    { desc:"communication, and financial management"},
    { desc:"A private dental community for global connections"},
    { desc:"Access to dental webinars, workshops, and career opportunities.."},
    {desc:"Live sessions with top dental experts ( Coming Soon ) "}
  
  ]
export default function LeftSignup() {
  return (
    <div className='scrollbar-custom text-center text-[20px] lg:font-bold hidden lg:flex lg:flex-col lg:px-2 lg:text-left lg:mb-none lg:bg-alternate lg:pt-[56px] lg:pb-[54px] lg:sticky lg:top-0 lg:left-0 sm:overflow-y-scroll  '>
      <div className="relative lg:mr-3  lg:mx-0 rounded-full overflow-hidden max-w-[300px] max-h-[300px] mx-auto self-center mb-5">
        <img src="/signLogo.jpg" alt="logo" className='hidden lg:block trw-logo w-full h-full object-cover transform scale-[1.39] text-center' />
      </div>
      <div className='flex flex-col text-[28px] mb-6'>
        <div className=' flex flex-row items-center gap-3 mb-3'>
          <FaKey className=' text-my-gold'/>
          <div className='xl:text-[36px] lg:text-[28px] text-[24px] font-bold'>UNLOCK ACCESS TO...</div>
        </div>
        {data.map((desc,index)=>{
          return(
            <div key={index} className='flex flex-row mb-4 gap-2'>
            <MdDone className=' text-my-gold'/>
            <div className='text-[16px]'>{desc.desc}</div>
          </div>
          )
        })}
        <div className='lg:text-[24px] mb-2 lg:ml-[42px]'>
          YDN is your all-in-one platform to manage, grow,
          <div>  and master your dental career. </div>
          <div> Take control of your time, </div>
          <div> reduce stress, and elevate your professional success.</div>
        </div>
        
      </div>
    </div>
  )
}
