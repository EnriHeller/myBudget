import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext()

export const LoginContextProvider = ({children})=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [confirmMessage, setConfirmMessage] = useState("")
    const navigate = useNavigate()


    function login(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": email,
        "password": password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        try {
            fetch("http://localhost:3001/logIn", requestOptions)
            .then((response) => {
                return response
            })
            .then((result) => {
                if(result.status === 200){
                    setErrorMessage("")
                    result.json().then((token)=>{
                        localStorage.setItem("token", `Bearer ${token}`)
                        navigate("/mainPage")
                    })
                }else{
                    result.json().then((message)=>{
                        setErrorMessage(message)
                        throw new Error(message)
                    })
                }
            })
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    function signUp(){
        try {
            if(password === repeatPassword){
                setErrorMessage("")

                const newUser = {
                    email: email,
                    password: password
                } 
                var myHeaders = new Headers();
                
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify(newUser);
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                
                fetch("http://localhost:3001/signUp", requestOptions)
                .then((response) => {return response})
                .then((result) => {
                    if(result.status === 200){
                        setErrorMessage("")
    
                        result.json().then((res)=>{
                            setConfirmMessage(res)
                            setTimeout(()=>{
                                setConfirmMessage("")

                            },3000)
                        })
                    }else{
                        result.json().then((res)=>{
                            setErrorMessage(res)
                            throw new Error(res)
                        })
                    }
                })
                .catch(error => {console.log('error', error)});
            }else{
                setErrorMessage("The passwords don't match. Please try again.")
                throw new Error("The passwords don't match. Please try again.")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return <LoginContext.Provider value ={{
        email,
        setEmail,

        password,
        setPassword,

        repeatPassword,
        setRepeatPassword,

        errorMessage,

        confirmMessage,
        setConfirmMessage,

        login,
        signUp,

    }}>
        {children}
    </LoginContext.Provider>
}