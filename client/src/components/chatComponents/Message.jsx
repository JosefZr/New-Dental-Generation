

export default function Message() {
  return (    
          <div className="chat-item-wrapper will-change-transform translate-y-0 w-full">
            <div className="chat-message group relative flex w-full focus:border-primary lg:pr-4 focus:ring " style={{transition:'transform 0.25s ease-out', flexDirection:"row",alignItems:"flex-start"}}>
              <div className="h-full flex items-start justify-center flex-shrink-0  w-20">
                {/* the icon image */}
                <section className="relative rounded-full bg-base-300 block flex-shrink-0 cursor-pointer" style={{width:"40px", height:"40px"}}>
                  <img src="https://assets.therealworld.ag/avatars/01J4JVWA9AMV0DMDTAAPAWR3Y0?max_side=80" className="rounded-full object-cover" loading="lazy" style={{width:"40px", height:"40px"}} alt="" />
                </section>
              </div>
              <div className=" inline-block w-full rounded-md border bg-bubble-gradient p-5  border-transparent">
                {/* name and time of posting */}
                <div className="flex items-center">
                  <span className="inline-flex items-center cursor-pointer font-medium text-xs md:text-sm hover:underline" style={{color:"rgba(17,128,106)"}}>GaryBeesley</span>
                  <span className="ml-3 cursor-default pt-[1px] text-3xs opacity-50">Today at 6:03 PM</span>
                </div>
                <span className="custom-break-words break-words text-sm">
                  <div className="sc-jEACwC gqSGRP markdown break-wordsfalse">
                    <p className="text-sm">$905 e-com store order</p>
                  </div>
                </span>

                <article className="flex">
                <div className="w-full h-full">
                  <img src="https://assets.therealworld.ag/attachments/01JCRC70ZPK1F6Q25PZMMBEVCK?max_side=640" alt="" />
                </div>
              </article>
              </div>
            </div>
          </div>
  )
}
