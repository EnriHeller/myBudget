import "./styles/App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignPage from "./pages/signPage";
import MainPage from "./pages/mainPage";


function App() {
  return (
      <BrowserRouter>
      
      <Routes>
            <Route path="/" element={<SignPage/>} />
            
            <Route path="/mainPage" element={<MainPage/>} />
      </Routes>
      
      </BrowserRouter>
  );
}

export default App;
