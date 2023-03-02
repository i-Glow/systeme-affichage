import {
  Outlet,
  Navigate,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Divider, Spin } from "antd";
import Flex from "./components/shared/Flex";
import { AuthProvider, useAuth } from "./context/AuthProvider";

import Layout from "./pages/Layout";
import Archive from "./pages/Archive";
import ArchiveDetail from "./pages/ArchiveDetail";
import CreateArticle from "./pages/CreateArticle";
import ArticleShow from "./pages/ArticleShow";
import Signin from "./pages/Signin";
import Users from "./pages/Users";
import { Role } from "./types";
import { roles } from "./utils/roles";
import CreateUser from "./pages/CreateUser";
import PendingArticle from "./pages/PendingArticle";
import PendingActicleDetail from "./pages/PendingActicleDetail";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute redirectPath="/signin" />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Archive />}></Route>
              <Route path="archive/:archiveId" element={<ArchiveDetail />} />
              <Route path="nouveau" element={<CreateArticle />}></Route>
              <Route path="archive/edit/:id" element={<CreateArticle />} />
              {/* <Route element={<AuthorizedRoute />}>
                <Route path="/users" element={<Users />} />
                <Route path="/users/nouveau" element={<CreateUser />} />
              </Route> */}
              <Route path="/PendingArticle" element={<PendingArticle />}></Route>
              <Route path="/PendingActicleDetail/:PendingActicleDetail" element={<PendingActicleDetail />}></Route>
            </Route>
            <Route path="/affichage" element={<ArticleShow />}></Route>
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <Flex h="100vh" gap="10px">
      <h3>404</h3>
      <Divider type="vertical" />
      <p>Page non trouvée</p>
    </Flex>
  );
}

function AuthorizedRoute({ redirectPath = "/" }) {
  //@ts-ignore
  const { user } = useAuth();

  return user.role === roles.admin ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} />
  );
}

function ProtectedRoute({ redirectPath = "/" }) {
  //@ts-ignore
  const { token, loading } = useAuth();

  if (loading)
    return (
      <Flex h="100vh">
        <Spin />
      </Flex>
    );

  return token ? <Outlet /> : <Navigate to={redirectPath} replace />;
}

export default App;
