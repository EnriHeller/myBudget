import MovRow from "./movRow";
import { useContext } from "react";
import { MainContext } from "../contexts/mainContext";


function Table(){
    const {selectedOption} = useContext(MainContext)

    function Title({content}){
        return(
            <div className="title-mainTable">{content}</div>
        )
    }

    return(
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
    )
}

export default Table;