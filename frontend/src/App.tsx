import ErrorComponent from "./Components/ErrorComponent";
import LogIn from "./Components/LogIn";
import ToDoList from "./Components/ToDoList";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LogIn />}></Route>
            <Route path="/ToDoList" element={<ToDoList />}></Route>
            <Route path="*" element={<ErrorComponent />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
