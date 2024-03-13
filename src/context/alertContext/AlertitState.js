import React, { useState } from 'react'
import AlertContext from './AlertContext'

export const AlertitState = ({ children }) => {

    const [alert, setAlert] = useState(null)

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500);


    }

    return (


        <AlertContext.Provider value={{ showAlert, alert }}>
            {children}
        </AlertContext.Provider>
    )


}
