import { useContext } from "react"
import ConfirmContainer from "./confirmContainer";
import { FetchContext } from "../contexts/fetchContext";

function Resume(){
    const {total,
         setOperation,
         popUpClass,
         setPopUpClass,
         setType
        }= useContext(FetchContext)

    function movementAction(type){
        setType(type)
        setOperation("new")
        if(popUpClass == "popUpBkg"){
            setPopUpClass("popUpBkg enablePopUp")
        }else{

            setPopUpClass("popUpBkg")
        }
    }

    return(
        <article className="mainResume">
            <ConfirmContainer/>
            <div className="mainResume-valueContainer">
                <h2>{`$${total}`}</h2>
            </div>
            <div className="mainResume-options">
                <button className="optionButton" onClick={()=>{movementAction("ENTRY")}}>Deposit +</button>
                <button className="optionButton" onClick={()=>{movementAction("EGRESS")}}>Widthdraw -</button>
            </div>
        </article>
    )
}

export default Resume;