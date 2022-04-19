import { useContext, useEffect } from "react"
import { MainContext } from "../contexts/mainContext"

function OptionsTable(){
    const {
        lastMovements,
        entries,
        expenses,
        setSelectedOption,
        selectedOption
    } = useContext(MainContext)

    useEffect(()=>{
        optionFunction(selectedOption)
    }, [selectedOption])

    function optionFunction(selection){
        setSelectedOption(selection)
        const buttons = document.getElementsByClassName("tableBtn")
        if(selection === lastMovements){
            chooseSelection(buttons,0)
        }else if(selection === entries){
            chooseSelection(buttons,1)
        }else if(selection === expenses){
            chooseSelection(buttons,2)
        }
    }

    function chooseSelection(array, indexSelected){
        for (let i = 0; i < array.length; i++) {
            const button = array[i];
            if(i===indexSelected){
                button.classList.add("selected")
            }else{
                button.classList.remove("selected")
            }
        }
    }

    return(
        <nav className="table-options">
                <button className="optionButton tableBtn" onClick={()=>{optionFunction(lastMovements)}}>
                    Last Movements
                </button>
                <button className="optionButton tableBtn" onClick={()=>{optionFunction(entries)}}>
                    Incomes
                </button>
                <button className="optionButton tableBtn" onClick={()=>{optionFunction(expenses)}}>
                    Expenses
                </button>
        </nav>
    )
}

export default OptionsTable;