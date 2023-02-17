import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/Layout";
import CreateArticle from "./pages/CreateArticle";
import Archive from "./pages/Archive";
import Brouillons from "./pages/Brouillons";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="archive" element={<Archive />}></Route>
          <Route path="Home" element={<CreateArticle />}></Route>
          <Route path="brouillons" element={<Brouillons />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
