
import { Routes, Route, BrowserRouter } from "react-router-dom"

import HomePage from './Componant/Page/HomePage'
import Home from './Componant/Page/Home'
import Archive from './Componant/Page/Archive'
import Brouillons from './Componant/Page/Brouillons'
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <HomePage/> }>
               <Route path="archive" element={ <Archive/> }></Route>
                <Route path="Home" element={ <Home/> }></Route> 
                <Route path="Brouillons" element={ <Brouillons/> }></Route> 
          </Route>
      </Routes> 
    </BrowserRouter>
    )
}

export default App;
