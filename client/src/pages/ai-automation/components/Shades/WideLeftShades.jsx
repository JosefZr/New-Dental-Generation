
export default function WideLeftShades() {
    return (
        <div>
            <div style={{position:"absolute"}} className=" top-0 left-0 h-full w-[15px] lg:w-[41px] hash-background"></div>
            <div style={{position:"absolute"}} className="bottom-[-10px] left-[-10px] hidden lg:block"><div className="plus-sign"></div></div>
            <div style={{position:"absolute"}} className="bottom-[-10px] left-[4px] lg:left-[30px]"><div className="plus-sign"></div></div>
        </div>
    )
}
