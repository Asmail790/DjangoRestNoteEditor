import { abort } from "process";
import { useEffect, useState } from "react"

import { JsonData } from "../shared/types";
/** 
 * What does useEffect do? By using this Hook, you tell React that your component needs to do something after render.
*/


const useFetch = (url:string) => {
    const [state, setState] = useState<JsonData>([])    
    
    useEffect(() => {
        let ignore = false;
        (async () => {
            const response = await fetch(url)
            const json: JsonData = await response.json()
            console.log(json)

                if (!ignore) {
                    setState(json)
                }
            

            
        })()
        return () => {ignore=true};
    }, [url])
    return state
}

export {useFetch}