import React, {useState, createContext, ReactNode, useEffect} from 'react'
import { useUserData } from '../Services/hooks/useUserData'

interface UserContextData{
    name: string,
    value: boolean,
    setName: (name:string)=>void,
    setValue: (value: boolean)=>void,
}

interface UserContextProps{
    children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export function UserContextProvider({ children } : UserContextProps){
    const [value, setValue] = useState(false)
    const [name, setName] = useState("")
    const { data, error  } = useUserData()

    useEffect(() =>{
        if(data && !error){
            setName(data.name)
            setValue(true)
        }
    }, [data, error])

    return(
        <UserContext.Provider value={{
            name,
            value,
            setValue,
            setName
        }}>
            {children}
        </UserContext.Provider>
    )
}