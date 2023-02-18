import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/Layout";

import Archive from "./pages/Archive";
import Brouillons from "./pages/Brouillons";
import ArchiveDetail from "./pages/ArchiveDetail";

import CreateArticle from "./pages/CreateArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="archive" element={<Archive />}></Route>
          <Route path="archive/:archiveId" element={<ArchiveDetail />}></Route>
          <Route path="Home" element={<Home />}></Route>
          <Route path="Brouillons" element={<Brouillons />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
