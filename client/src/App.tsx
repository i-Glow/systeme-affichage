
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css'
import HomePage from './Componant/Page/HomePage'
import Home from './Componant/Page/Home'
import Archive from './Componant/Page/Archive'
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <HomePage/> }>
               <Route path="archive" element={ <Archive/> }></Route>
                <Route path="Home" element={ <Home/> }></Route> 
          </Route>
      </Routes> 
    </BrowserRouter>
    )
}

export default App;
