import { NavigationSidebar } from ".";
import { Separator } from "../ui/separator";

export default function NavigationSidbar1() {
  return (
    <section className="hide-scrollbar flex h-full flex-shrink-0 flex-col items-center overflow-y-auto overflow-x-hidden border-grey-secondary border-r bg-neutral pt-inset-top" style={{width: "64px", paddingBottom: "0px"}}>
    <div className="flex w-full flex-col items-center">
      <div className="relative flex h-[64px] w-full items-center justify-center transition-opacity">
        <section className="flex-shrink-0 rounded-full bg-base-300 relative cursor-pointer" style={{width: "40px", height: "40px"}}aria-hidden="true">
          <img src="https://assets.therealworld.ag/avatars/01J8SJX89TTNG3ECQZKX662GHZ?max_side=80" className="rounded-full object-cover" style={{width: "40px", height: "40px"}} />
          {/* <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute" style={{color:"color: gold",bottom:"-2px", right:"-2px", fontSize:"16px",width:"16px",height:"16px",filter:"drop-shadow(0 0 1px gray)"}}>
            <path d="M5.752 25H21.88V24.712C21.88 21.352 21.592 18.216 20.984 15.272C19.768 9.384 16.12 5.416 12.184 4.296C12.184 2.664 11.352 1.16 10.072 0.455999H8.952C8.984 0.743999 9.016 1.16 9.016 1.544C9.016 2.152 8.92 3.24 8.76 3.624H8.568C8.344 2.568 7.64 1.8 6.52 1.384H5.752C5.912 2.056 6.008 2.728 6.008 3.4C6.008 4.072 5.912 4.744 5.72 5.352C3.928 6.344 3.704 6.984 3.192 8.84C2.936 9.768 2.616 10.472 2.264 10.92C1.912 11.368 1.496 12.136 1.112 13.256C0.728 14.344 0.408 15.208 0.12 15.752L1.56 18.024C1.976 18.696 2.648 18.92 3.768 18.92C4.28 18.92 4.856 18.504 5.496 17.672C6.136 16.808 6.712 16.232 7.224 15.88C8.216 15.784 8.92 15.688 9.336 15.56C10.2 15.304 10.808 14.504 10.872 14.152H11C11.032 14.28 11.064 14.568 11.064 14.728C11.064 15.624 10.552 16.36 9.176 17.736C8.024 18.888 7.32 19.688 7 20.136C6.36 21.032 5.752 22.92 5.752 25ZM17.592 22.856C17.752 21.672 17.816 20.264 17.816 18.664C17.816 12.168 16.472 9.736 13.816 7.464L14.104 7.272C15.128 7.912 16.088 8.936 17.048 10.312C18.968 13.032 19.704 17.864 19.704 22.856H17.592ZM6.456 9.192C5.944 9.192 5.624 9.128 5.464 9L5.432 8.872V8.648C5.432 8.2 5.912 7.912 6.616 7.912C6.872 7.912 7.16 7.976 7.416 8.04L8.312 8.296V8.584L8.056 8.552C7.736 8.552 7.48 8.68 7.256 8.872C7.032 9.064 6.744 9.192 6.456 9.192ZM3.256 16.072C3 16.04 2.552 15.72 2.392 15.368C2.616 14.504 3.384 13.896 4.568 13.832L4.696 13.992C3.832 14.6 3.384 15.496 3.256 16.072Z" fill="currentColor"></path>
          </svg> */}
        </section>
      </div>
      <div className="relative flex h-[64px] w-full items-center justify-center transition-opacity">
        <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-base-300">
          <button className="btn btn-circle !bg-transparent btn-md btn-ghost">
            <img className="h-15 w-15" src="https://app.jointherealworld.com/help-btn-4.png" alt="help" />
          </button>
        </div>
      </div>
      <Separator className="my-2 h-[2px]  bg-[#17242d] rounded-md w-10 mx-auto" />
    </div>

    <div className="flex w-full flex-col items-center">
      <div className="w-full">
        <NavigationSidebar/>
      </div>
    </div>
  </section>
  )
}
