import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { existsCookie } from "./CookieFunctions";

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
    navigateToToDoList();
  }, []);

  return (
    <div>
      <header>
        <h1>To-Do-Liste mit Redis</h1>
      </header>
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
