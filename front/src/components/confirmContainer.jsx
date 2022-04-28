import { useContext, useState, useEffect } from "react";
import { MainContext } from "../contexts/mainContext";

function ConfirmContainer(){
    const [confirmClass, setConfirmClass] = useState("confirmMessage")
    const {confirmMessage, setConfirmMessage }= useContext(MainContext)

    useEffect(()=>{
        if(confirmMessage !== ""){
            setConfirmClass("confirmMessage enablePopUp")
            setTimeout(()=>{
                setConfirmClass("confirmMessage")
            }, 2000)
        }
    },[confirmMessage])

    return(
        <h2 className={confirmClass}>{confirmMessage}</h2>
    )
}

export default ConfirmContainer;