import { useContext } from "react";
import { FetchContext } from "../contexts/fetchContext";

function SignInForm(){
    const {setEmail, setPassword,login, errorMessage}= useContext(FetchContext)

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
            <button>Sign In</button>
        </form>
    )
}

export default SignInForm;