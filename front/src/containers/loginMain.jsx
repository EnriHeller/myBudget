import { useState, useContext } from "react"
import SignUpForm from "../components/signUpForm";
import SignInForm from "../components/signInForm";
import { FetchContext } from "../contexts/fetchContext";


function LoginMain(){
    const [formClass, setFormClass] = useState("loginMain-slider")
    const [contentClass, setContentClass] = useState("loginMain-formContainer signIn")
    const [contentClass2, setContentClass2] = useState("loginMain-formContainer signUp")
    const {confirmMessage}= useContext(FetchContext)

    

    function toggleFormClass(){
        if(formClass === "loginMain-slider"){
            setFormClass("loginMain-slider active")
            setContentClass("loginMain-formContainer signIn active")
            setContentClass2("loginMain-formContainer signUp active")
        }else{
            setFormClass("loginMain-slider")
            setContentClass("loginMain-formContainer signIn")
            setContentClass2("loginMain-formContainer signUp")
        }
    }

    

    return(
        <main className="loginMain">

            <div className="loginMain-container">
                <div className="loginMain-titleContainer">
                    {"Already have an Account?"}
                    
                    <button className="titleButton" onClick={toggleFormClass}>Sign in</button>
                </div>

                <div className="loginMain-titleContainer">
                    {"Don't have an Account ?"}

                    <button className="titleButton" onClick={toggleFormClass}>
                        Sign Up
                    </button>
                </div>
            </div>

            <div className={formClass}>
                <div className={contentClass}>
                    <h2 className="loginMain-formTitle">Sign In</h2>

                    <SignInForm/>
                </div>
                <div className={contentClass2}>
                    <h2 className="loginMain-formTitle">Sign Up</h2>
                    <SignUpForm/>
                    <div className="signMessage">{confirmMessage}</div>
                </div>
            </div>

        </main>
    )
}

export default LoginMain;