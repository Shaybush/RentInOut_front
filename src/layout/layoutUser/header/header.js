import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Wrapper } from "../../../components/style/wrappers/navbarUser";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  onLogout,
  onRegisterShow,
  onSearchToggle,
} from "../../../redux/features/toggleSlice";
import { API_URL_CLIENT } from "../../../services/service";
import Search from "../../../components/icons/search";
import Dashboard from "../../../components/icons/dashboard";
import Profile from "../../../components/icons/profile";
import Bell from "../../../components/icons/bell";
import Settings from "../../../components/icons/settings";
import Inbox from "../../../components/icons/inbox";
import SignIn from "../../../components/icons/signIn";
import SignOut from "../../../components/icons/signOut";
import WishList from "../../../components/icons/wishlist";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userSlice?.user !== null);
  const { user } = useSelector((state) => state.userSlice);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <section>
        <div className="left flex flex-wrap">
          <Link to={"/"}>
            <Logo>
              <img src="./img/LOGO.png" alt="logo" />
              <p>rentInOut</p>
            </Logo>
          </Link>
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              className="border-transparent focus:border-transparent focus:ring-0"
            />
            <div className="icon">
              <Search color="#333" width="16" height="16" />
            </div>
          </div>
        </div>
        <div className="right">
          <nav>
            {isLogin && (
              <ul>
                <li>
                  <button
                    type="button"
                    className="inline-flex relative items-center p-3 text-sm  text-center"
                  >
                    <Inbox color="black" width="20" height="20" />
                    <span className="sr-only">Notifications</span>
                    <div className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                      1
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex relative items-center p-3 text-sm  text-center"
                  >
                    <Bell />
                    <span className="sr-only">Notifications</span>
                    <div className="z-10 inline-flex absolute -top-1 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                      2
                    </div>
                  </button>
                </li>
              </ul>
            )}
          </nav>
          <div
            className="relative avatar"
            onMouseOver={() => setIsOpen(true)}
            onClick={() => setIsOpen(true)}
          >
            <img
              className="rounded-full"
              src={
                user !== null && user?.active
                  ? user.profile_img?.url || user?.profile_img
                  : "https://freesvg.org/img/Male-Avatar.png"
              }
              alt=""
            />
            <span
              className={`${
                isLogin ? "bg-green-400" : "bg-red-400"
              } bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full`}
            ></span>
          </div>
        </div>
      </section>
      {isOpen && (
        <ul
          onMouseLeave={() => setIsOpen(false)}
          className="absolute dropdown transition shadow bg-white z-50 w-full rounded right-0 -top-15 md:w-1/4 md:-bottom-30"
        >
          {isLogin && (
            <React.Fragment>
              <li
                onClick={() => {
                  setIsOpen(false);
                  nav("/");
                }}
                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <p>Home</p> <Dashboard color="black" />
                </div>
              </li>
              <li
                onClick={() => {
                  setIsOpen(false);
                  nav("/profile");
                }}
                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <p>Profile</p> <Profile color="black" />
                </div>
              </li>
              <li
                onClick={() => {
                  setIsOpen(false);
                  nav("/profile1");
                }}
                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <p>Settings</p> <Settings />
                </div>
              </li>
              <li
                className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
              >
                <Link
                  className="flex justify-between items-center"
                  to={user?.role === "admin" ? "/admin/wishlist" : "/wishlist"}
                >
                  <span>Wish List</span>
                  <WishList />
                </Link>
              </li>
            </React.Fragment>
          )}

          <li
            onClick={() => dispatch(onSearchToggle())}
            className={`w-full p-2 rounded transition ease-in-out delay-150 cursor-pointer hover:bg-blue-200`}
          >
            <Link className="flex justify-between items-center">
              <span>Search</span>
              <Search />
            </Link>
          </li>
          <li
            onClick={() => {
              if (isLogin) {
                localStorage.removeItem("token");
                window.open(API_URL_CLIENT, "_self");
                dispatch(onLogout());
                setIsOpen(false);
              } else {
                // nav("/register")
                dispatch(onRegisterShow());
                setIsOpen(false);
              }
            }}
            className={`w-full p-2 rounded cursor-pointer`}
          >
            {isLogin ? (
              <div className="flex justify-between items-center">
                {" "}
                <p>Signout</p> <SignOut color="black" />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p>Signin</p> <SignIn />
              </div>
            )}
          </li>
        </ul>
      )}
    </Wrapper>
  );
};
export default Header;
