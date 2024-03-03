import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const Layout = () => {
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
