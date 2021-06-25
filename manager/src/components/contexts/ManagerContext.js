import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { apiUrl, TOKEN } from '../utils/constants'
import setToken from '../utils/setToken'


export const ManagerContext = createContext()

const ManagerContextProvider = ({children}) => {
    const [managerState, setManagerState] = useState({
        isAuthen: false,
        Manager: null
    })

    const loadManager = async () => {
        if (localStorage[TOKEN]) {
            setToken(localStorage[TOKEN])
        }
        try {
            const response = await axios.get(`${apiUrl}/authen/manager`)
            if (response.data.success) {
                setManagerState({
                    isAuthen: true,
                    manager: response.data.Manager
                })
            }
        }
        catch (error) {
            localStorage.removeItem(TOKEN)
            setToken(null)
            setManagerState({
                isAuthen: false,
                manager: null
            })
        }
    }

    useEffect(() => loadManager(), [])

    const sendSigninForm = async (signinForm) => {
        try {
            const response = await axios.post(`${apiUrl}/authen/manager/signin`, signinForm)
            if (response.data.success) {
                localStorage.setItem(TOKEN, response.data.encodedToken)
            }
            await loadManager()
            return response.data
        }
        catch (error) {
            if (error.response.data) return error.response.data
            return {success: false, message: error.message}
        }
    }

    const managerSignout = () => {
        localStorage.removeItem(TOKEN)
        setToken(null)
        setManagerState({
            isAuthen: false,
            manager: null
        })
    }

    const ManagerContextData = {sendSigninForm, managerSignout, managerState}

    return (
        <ManagerContext.Provider value={ManagerContextData}>
            {children}
        </ManagerContext.Provider>
    )
}

export default ManagerContextProvider