import { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";

function ErrorContainer(){
    const {errorMessage}= useContext(LoginContext)

    return(
        <div className="errorContainer">{errorMessage}</div>
    )
}

export default ErrorContainer;