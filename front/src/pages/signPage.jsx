import Header from "../containers/header"
import LoginMain from "../containers/loginMain"
import Footer from "../containers/footer";
function signPage(){
    return(
        <div className="signPage">
            <Header></Header>
            <LoginMain></LoginMain>
            <Footer></Footer>
        </div>
    )
}

export default signPage;