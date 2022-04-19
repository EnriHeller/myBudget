import "./styles/App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignPage from "./pages/signPage";
import MainPage from "./pages/mainPage";
import { FetchContextProvider} from "./contexts/fetchContext";
import { MainContextProvider } from "./contexts/mainContext";

function App() {
  return (
      <BrowserRouter>
      
        <FetchContextProvider>
          <Routes>

            <Route path="/" element={<SignPage/>} />
            
            <Route path="/mainPage" element={<MainPage/>} />

          </Routes>
        </FetchContextProvider>
      
      </BrowserRouter>
  );
}

export default App;
