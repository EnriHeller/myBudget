import { useContext } from "react";
import { LoginContext } from "../contexts/loginContext";

function SignUpForm(){
    const {setEmail, setPassword, setRepeatPassword,signUp}= useContext(LoginContext)

    function handleSubmit(event){
        event.preventDefault();
        signUp()
    }

    return(
        <form className="loginForm"  onSubmit={(e)=>{handleSubmit(e)}}>
            <label htmlFor="signUpEmail" >
                Email <input type="email" id="signUpEmail" onChange={(event)=>{
                    setEmail(event.target.value)
                }}></input>
            </label>
            <label htmlFor="signInPassword" >
                Password <input type="password" id="signInPassword" autoComplete="off" onChange={(event)=>{
                    setPassword(event.target.value)
                }}></input>
            </label>
            <label htmlFor="repeatPassword" >
                Repeat password <input type="password" id="repeatPassword" autoComplete="off" onChange={(event)=>{
                    setRepeatPassword(event.target.value)
                }}></input>
            </label>

            <button className="optionButton">Sign Up</button>
        </form>
    )
}   

export default SignUpForm;