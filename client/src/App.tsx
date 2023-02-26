import { Routes, Route, BrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import Archive from "./pages/Archive";
import ArchiveDetail from "./pages/ArchiveDetail";
import CreateArticle from "./pages/CreateArticle";
import ArticalShow from "./pages/ArticalShow";
import ArticleShow1 from "./pages/ArticleShow1";
import Signin from "./pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute redirectPath="/signin" />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Archive />}></Route>
              <Route
                path="archive/:archiveId"
                element={<ArchiveDetail />}
              ></Route>
              <Route path="nouveau" element={<CreateArticle />}></Route>
              <Route path="archive/edit/:id" element={<CreateArticle />} />
            </Route>
          </Route>
          <Route path="/show" element={<ArticalShow />}></Route>
          <Route path="/show1" element={<ArticleShow1 />}></Route>
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

import { Outlet, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";

function ProtectedRoute({ redirectPath = "/" }) {
  //@ts-ignore
  const { token, loading } = useAuth();

  if (loading) return <p>loading</p>;

  return token ? <Outlet /> : <Navigate to={redirectPath} replace />;
}

export default App;
