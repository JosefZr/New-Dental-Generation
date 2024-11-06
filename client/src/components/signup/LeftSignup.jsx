import { FaKey } from "react-icons/fa6"
import { MdDone } from "react-icons/md"

const data = [
    { desc:"Live calls and AMAs with Experts"},
    { desc:"24/7 Support and on-demand guidance"},
    { desc:"Over 18 Modern Wealth Creation Methods"},
    { desc:"7+ Distinct Campuses"},
    { desc:"1000+ Professionally made Video lessons"},
    { desc:"Live calls and AMAs with Experts"},
  
  ]
export default function LeftSignup() {
  return (
    <div className='text-center text-[20px] lg:font-bold hidden lg:flex lg:flex-col lg:px-[7vw] lg:text-left lg:mb-none lg:bg-alternate lg:pt-[56px] lg:pb-[54px] lg:sticky lg:top-0 lg:left-0 sm:overflow-y-scroll  '>
      <img src="https://www.jointherealworld.com/checkout/_next/static/media/trw-knight-globe-with-ring.4b17fbc5.svg" alt="logo" className='hidden lg:block w-[434px] h-[236px] mr-auto pb-[20px]' width="434" height="238"/>
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
          An active community of like-minded,
          <div> wealth-focused individuals.</div>
        </div>
        
      </div>
    </div>
  )
}
