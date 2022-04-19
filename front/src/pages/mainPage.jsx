import Footer from "../containers/footer";
import Header from "../containers/header"
import Main from "../containers/main";
import Popup from "../containers/movementPopup";

function MainPage(){
    return(
        <div>
            <Popup></Popup>
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
        </div>
    )
}

export default MainPage;