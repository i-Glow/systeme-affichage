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
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import CreateArticle from "./pages/CreateArticle";
import SlideShow from "./pages/SlideShow";
import ArticleShow from "./pages/Affichage";
import Signin from "./pages/Signin";
import Users from "./pages/Users";
import { roles } from "./utils/roles";
import CreateUser from "./pages/CreateUser";
import PendingArticle from "./pages/PendingArticle";
import PendingActicleDetail from "./pages/PendingActicleDetail";
import Archive from "./pages/Archive";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute redirectPath="/signin" />}>
            <Route path="/" element={<Layout />}>
              <Route path="/articles" element={<Articles />} />
              <Route path="articles/:archiveId" element={<ArticleDetails />} />
              <Route path="articles/nouveau" element={<CreateArticle />} />
              <Route path="articles/edit/:id" element={<CreateArticle />} />
              <Route element={<AdminOnlyRoute />}>
                <Route path="/users" element={<Users />} />
                <Route path="/users/nouveau" element={<CreateUser />} />
              </Route>
              <Route path="/pendingarticles" element={<PendingArticle />} />
              <Route
                path="/pendingarticles/:PendingActicleDetail"
                element={<PendingActicleDetail />}
              />
              <Route path="/archive" element={<Archive />} />
            </Route>
          </Route>
          <Route path="/affichage" element={<SlideShow />}></Route>
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
      <p>Page Not Found</p>
    </Flex>
  );
}

function AdminOnlyRoute({ redirectPath = "/" }) {
  //@ts-ignore
  const { user } = useAuth();

  return user?.role === roles.admin ? (
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
