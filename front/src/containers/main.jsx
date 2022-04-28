import { useContext, useEffect} from "react";
import { MainContext } from "../contexts/mainContext";

import Resume from "../components/resume";
import OptionsTable from "../components/optionsTable";
import Table from "../components/table";

function Main(){
    const {getMovements} = useContext(MainContext)

    useEffect(()=>{
        getMovements()
    }, [])

    return(
        <main className="main">
            <Resume/>
            <OptionsTable/>
            <Table/>
        </main>
    )
}

export default Main;