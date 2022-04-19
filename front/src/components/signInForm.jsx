import { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";

function SignInForm(){
    const {setEmail, setPassword,login, errorMessage}= useContext(LoginContext)

    function handleSubmit(event){
        event.preventDefault();
        login()
    }

    function ErrorContainer(){
        return(
            <div className="errorContainer">{errorMessage}</div>
        )
    }

    return(
        <form className="loginForm" onSubmit={(e)=>{handleSubmit(e)}}>
            <label htmlFor="email" >
                Email <input type="email" id="email" onChange={(event)=>{setEmail(event.target.value)}}></input>
            </label>
            <label htmlFor="Password" >
                Password <input type="password" id="password" autoComplete="off" onChange={(event)=>{
                    setPassword(event.target.value)
                    }}>

                    </input>
            </label>
                <ErrorContainer/>
            <button className="optionButton">Sign In</button>
        </form>
    )
}

export default SignInForm;