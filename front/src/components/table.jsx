import MovRow from "./movRow";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/mainContext";


function Table(){
    const {selectedOption, lastMovements} = useContext(MainContext)
    const [firstMovClass, setFirstMovClass] = useState("firstMovContainer hidden")
    function Title({content}){
        return(
            <div className="title-mainTable">{content}</div>
        )
    }

    useEffect(()=>{
        if(selectedOption === lastMovements && selectedOption.length === 0){
            setFirstMovClass("firstMovContainer")
        }else{
            setFirstMovClass("firstMovContainer hidden")
        }
    },[selectedOption])
    return(
        <>
            <section className="mainTable">
                <Title content={"Type"}></Title>
                <Title content={"Amount"}></Title>
                <Title content={"Concept"}></Title>
                <Title content={"Date"}></Title>
                <Title content={"Actions"}></Title>

                {selectedOption.map(mov=>{
                    return(
                        <MovRow movement={mov} key={mov.id}/>
                    )
                })}
            </section>

            <div className={firstMovClass}>
                <p>
                    Press on <b>Deposit +</b> or <b>Widthdraw -</b> for a new movement
                </p>
            </div>
        </>
        
    )
}

export default Table;