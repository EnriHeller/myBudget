import Header from "../containers/header"
import LoginMain from "../containers/loginMain"
import Footer from "../containers/footer";
import { LoginContextProvider } from "../contexts/loginContext";

function signPage(){
    return(
        <LoginContextProvider>
            <div className="signPage">
                <Header></Header>
                <LoginMain></LoginMain>
                <Footer></Footer>
            </div>
        </LoginContextProvider>
    )
}

export default signPage;