import { useContext, useEffect} from "react";
import { FetchContext } from "../contexts/fetchContext";

import Resume from "../components/resume";
import OptionsTable from "../components/optionsTable";
import Table from "../components/table";

function Main(){
    const {getMovements} = useContext(FetchContext)

    useEffect(()=>{
        getMovements()
    }, [])

    return(
        <main className="main">
            <Resume></Resume>
            <OptionsTable/>
            <Table></Table>
        </main>
    )
}

export default Main;