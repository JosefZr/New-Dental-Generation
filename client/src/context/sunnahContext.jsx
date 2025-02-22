import { createContext, useState } from "react"

export  const SunnahContext = createContext();
// eslint-disable-next-line react/prop-types
export default function SunnahProvider({children}){
    const [dikr, setDikr] = useState();
    
    return <SunnahContext.Provider 
        value=
            {{
                dikr, setDikr,
            }}
        >{children}
    </SunnahContext.Provider>
}