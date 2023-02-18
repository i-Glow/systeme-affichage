import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/Layout";
import Archive from "./pages/Archive";
import Brouillons from "./pages/Brouillons";
import ArchiveDetail from "./pages/ArchiveDetail";
import CreateArticle from "./pages/CreateArticle";
import ArticalShow from "./pages/ArticalShow";
import Edit from "./pages/Edit";
import Signin from "./pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectedRoute redirectPath="/signin" />}>
          <Route path="/" element={<HomePage />}>
            <Route path="archive" element={<Archive />}></Route>
            <Route
              path="archive/:archiveId"
              element={<ArchiveDetail />}
            ></Route>
            <Route path="nouveau" element={<CreateArticle />}></Route>
            <Route path="Brouillons" element={<Brouillons />}></Route>
            <Route
              path="archive/edit/:editArchiveId"
              element={<Edit />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

function ProtectedRoute({ redirectPath = "/" }) {
  //@ts-ignore
  const { user, loading } = useAuth();

  if (loading) return <p>loading</p>;

  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
}

export default App;
