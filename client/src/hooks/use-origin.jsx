import { useEffect, useState } from "react";

export default function useOrigin() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {

    }, [])  

    const origin = window !== "undefined" && window.location.origin ? window.location.origin :""
    if(!mounted){
        return "";
    }
    return origin;
}
