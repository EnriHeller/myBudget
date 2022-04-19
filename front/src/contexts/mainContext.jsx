import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MainContext = createContext()

export const MainContextProvider = ({children})=>{
    const [popUpClass, setPopUpClass] = useState("popUpBkg")
    const [type, setType] = useState("ENTRY")
    const [value, setValue] = useState("")
    const [concept, setConcept] = useState("")
    const [lastMovements, setLastMovements] = useState([])
    const [operation, setOperation] = useState("")
    const [total, setTotal] = useState(0)
    const [entries, setEntries]= useState([])
    const [expenses, setExpenses]= useState([])
    const [selectedOption, setSelectedOption] = useState([])

    const [errorMessage, setErrorMessage] = useState("")
    const [confirmMessage, setConfirmMessage] = useState("")
    const navigate = useNavigate()

    function getMovements(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/budget", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.length < 11){
                setLastMovements(result.reverse())
                setSelectedOption(result.reverse())
            }else{
                const lastMovs = result.slice(result.length - 10, result.length)
                setLastMovements(lastMovs.reverse())
                setSelectedOption(lastMovs.reverse())
            }
            
            
            let counter = 0
            const entryResults = []
            const egressResults = []

            result.forEach(element=>{
                if(element.type === "EGRESS"){
                    egressResults.push(element)
                    counter = counter - element.value
                }else if(element.type === "ENTRY"){
                    entryResults.push(element)
                    counter = counter + element.value
                }
            })
            setTotal(counter)
            setEntries(entryResults)
            setExpenses(egressResults)
        })
        .catch(error => console.log('error', error));
    }

    function newMovement(type, value, concept){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "type": type,
        "value": value,
        "concept": concept
        });


        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        try {
            fetch("http://localhost:3001/budget", requestOptions)
            .then((response) => {
                return response
            })
            .then((result) => {
                if(result.status === 200){
                    setErrorMessage("")

                    result.json().then((message)=>{
                        setPopUpClass("popUpBkg")
                        setConfirmMessage(message)
                        getMovements()
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

    function deleteMovement(id){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("token"));

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://localhost:3001/budget/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setConfirmMessage(result)
            getMovements()

        })
        .catch(error => console.log('error', error));
    }

    function editMovement(id){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("token"));

        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"value": parseInt(value),"concept": concept});

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:3001/budget/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setPopUpClass("popUpBkg")
            setConfirmMessage(result)
            getMovements()
        })
        .catch(error => console.log("error", error));
    }

    return <MainContext.Provider value ={{
        operation,
        setOperation,
        newMovement,
        getMovements,
        deleteMovement,
        editMovement,

        popUpClass, 
        setPopUpClass,

        type,
        setType,

        value,
        setValue,

        concept,
        setConcept,

        lastMovements,
        total,
        expenses,
        entries,
        selectedOption,
        setSelectedOption
    }}>
        {children}
    </MainContext.Provider>
}