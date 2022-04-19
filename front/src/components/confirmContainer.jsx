import { useContext, useState, useEffect } from "react";
import { FetchContext } from "../contexts/fetchContext";

function ConfirmContainer(){
    const [confirmClass, setConfirmClass] = useState("confirmMessage")
    const {confirmMessage, setConfirmMessage }= useContext(FetchContext)

    useEffect(()=>{
        if(confirmMessage !== ""){
            setConfirmClass("confirmMessage enablePopUp")
            setTimeout(()=>{
                setConfirmClass("confirmMessage")
                setConfirmMessage("")
            }, 2000)
        }
    },[confirmMessage])

    return(
        <h2 className={confirmClass}>{confirmMessage}</h2>
    )
}

export default ConfirmContainer;