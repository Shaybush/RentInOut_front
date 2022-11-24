
import React, { useEffect, Suspense } from "react";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { doApiMethod } from "./services/service";
import { onLogin } from "./redux/features/userSlice";
import MyProfile from "./pages/client/myProfile/myProfile";
import { Details } from "./components/profileEdit/details";

// Lazy loading of routes

const LayoutAdmin = React.lazy(() => import("./layout/layoutAdmin/layoutAdmin"));
const Users = React.lazy(() => import("./pages/admin/users"));
const HomeAdmin = React.lazy(() => import("./pages/admin/homeAdmin"));
const Categories = React.lazy(() => import("./pages/admin/categories"));
const Layout = React.lazy(() => import("./layout/layoutUser/layout"));
const About = React.lazy(() => import("./pages/client/about"));
const Dashboard = React.lazy(() => import("./pages/client/dashboard"));
const Register = React.lazy(() => import("./api/auth/register"));
const Posts = React.lazy(() => import("./pages/admin/posts"));
const Page404 = React.lazy(() => import("./pages/error/page404"));



const AppRoutes = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userSlice);
  let isRegister = useSelector((state) => state.toggleSlice.register);

  useEffect(() => {
    let token;
    if (localStorage["token"]) {
      token = localStorage["token"];
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now()) {
        getUserInfo(decoded._id, token);
      }
    }
  }, []);

  const getUserInfo = async (_id, token) => {
    let url = "/users/info/" + _id;
    const { data } = await doApiMethod(url, "GET", token);
    if (!data.userInfo) {
      alert("invalid user");
      return;
    }
    dispatch(onLogin(data.userInfo));
  };

  return (


    <Suspense fallback={<h1 className="content-center ">Loading....</h1>}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* outLet */}
            {/* Guest Routes */}
            <Route index element={<Dashboard />} />
            {user?.role === "user" && user?.active && (
              <React.Fragment>
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/profile1" element={"<Dashboard />"} />
                <Route path="/profile2" element={"<Users />"} />
                <Route path="/details" element={<Details/>} />

                <Route path="*" element={<Page404 />} />
              </React.Fragment> 
            )}

          </Route>
          {user?.role === "admin" && user?.active && (
            <Route path="/admin" element={<LayoutAdmin />}>
              {/* OutLet */}
              <Route path="/admin" element={<HomeAdmin />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/posts" element={<Posts />} />
              <Route path="/admin/*" element={<Page404 />} />
            </Route>
          )}
        </Routes>
        {isRegister && <Register />}
        <ToastContainer position="top-right" />
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
