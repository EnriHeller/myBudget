import { useContext, useState, useEffect } from "react";
import { FetchContext } from "../contexts/fetchContext";

function Popup(){
    const {
        popUpClass,
        type,
        setPopUpClass,
        newMovement,
        errorMessage,
        value,
        setValue,
        concept,
        setConcept,
        operation,
        editMovement
    }= useContext(FetchContext)

    const [title, setTitle] = useState("New entry")


    function numberValidation(event){
        if(!isNaN(event.target.value)){
            setValue(event.target.value)
        }
    }

    useEffect(()=>{

        if(operation.type === "edit"){
            setTitle("Edit movement")

        }else{
            if(type === "ENTRY"){
                setTitle("New entry")
            }else if (type === "EGRESS"){
                setTitle("New egress")
            }
        }
    }, [operation, type])

    return(
        <div className={popUpClass}>
            <div className="popUpContainer">
                <h2>{title}</h2>
                <form className="popUpForm" onSubmit={(event)=>{
                    event.preventDefault()
                    if(operation === "new"){
                        newMovement(type, value, concept)
                    }else if(operation.type === "edit"){
                        console.log(operation.id)
                        editMovement(operation.id)
                    }
                    }}>
                    <label htmlFor="value" >
                        
                        <div className="amountInputContainer">
                        <p>Amount: $</p>
                        <input 
                            type="text"
                            value={value} 
                            id="value" 
                            placeholder="0"
                            onChange={(event)=>{
                                numberValidation(event)
                            }}
                        />
                        </div>
                    </label>
                    <label htmlFor="concept" >
                        Concept:
                        <textarea 
                        value={concept} 
                        id="concept" 
                        onChange={(event)=>{setConcept(event.target.value)}}/>
                    </label>

                    <div className="popUpBtnContainer">
                        <button className="optionButton" onClick={(event)=>{
                            event.preventDefault()
                            setPopUpClass("popUpBkg")
                            }}>Cancel</button>
                        <button className="optionButton" >Accept</button>
                    </div>
                </form>

                <div className="errorContainer">{errorMessage}</div>
            </div>
        </div>


    )
}

export default Popup;