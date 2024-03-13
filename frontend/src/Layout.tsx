import "./main.css";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { existsCookie, getCookie } from "./CookieFunctions";
import { Header } from "./main.styles";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateToToDoList = () => {
      const username = existsCookie();
      if (username) {
        sessionStorage.setItem("username", username);
        navigate("/loggedIn/ToDoList");
      }
    };
    if (!sessionStorage.getItem("username")) {
      navigateToToDoList();
    } else if (
      getCookie("username" + sessionStorage.getItem("username")) &&
      getCookie("token" + sessionStorage.getItem("username"))
    ) {
      navigate("/loggedIn/ToDoList");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
