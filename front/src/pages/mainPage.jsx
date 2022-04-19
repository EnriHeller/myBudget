import Footer from "../containers/footer";
import Header from "../containers/header"
import Main from "../containers/main";
import Popup from "../containers/movementPopup";
import { MainContextProvider } from "../contexts/mainContext";

function MainPage(){
    return(
        <MainContextProvider>

            <Popup></Popup>
            <Header></Header>
            <Main></Main>
            <Footer></Footer>

        </MainContextProvider>
    )
}

export default MainPage;