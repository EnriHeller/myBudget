import { useContext } from "react"
import { MainContext } from "../contexts/mainContext"
import editIcon from "../imgs/editIcon.png";
import deleteIcon from "../imgs/deleteIcon.png";


function MovRow({movement}){
    const {deleteMovement, setConcept, setValue, setPopUpClass, setOperation}= useContext(MainContext)
    
    function TypeField({type}){
        if(type === "ENTRY"){
            return(
                <div className="typeDiv">
                    +
                </div>
            )
        }else if(type === "EGRESS"){
            return(
                <div className="typeDiv">
                    -
                </div>
            )
        }
    }

    return(
        <>
                        <div className="content-mainTable">
                        <TypeField type={movement.type}/>
                        </div>
                        <div className="content-mainTable">{`$ ${movement.value}`}</div>
                        <div className="content-mainTable">{movement.concept}</div>
                        <div className="content-mainTable">{movement.createdAt}</div>
                        <div className="content-mainTable">{
                            <div className="actionButtonsContainer">
                                <button className="editButton" onClick={()=>{
                                    setOperation({type: "edit", id:movement.id})
                                    setConcept(movement.concept)
                                    setValue(movement.value)
                                    setPopUpClass("popUpBkg enablePopUp")
                                }}>
                                    <img className= "actionImg" src={editIcon}/>
                                </button>
                                <button className="deleteButton" onClick={
                                        ()=>{
                                            deleteMovement(movement.id)
                                        }
                                    }>
                                    <img className= "actionImg" src={deleteIcon} />
                                </button>
                            </div>
                        }</div>
                    </>
    )
}

export default MovRow;