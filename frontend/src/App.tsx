import { useState } from "react";
import ErrorComponent from "./Components/ErrorComponent";
import LogIn from "./Components/LogIn";
import ToDoList from "./Components/ToDoList";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Entry } from "./interface";
import UserManagement from "./Components/UserManagement";
import Websocket from "./Components/Websocket";

function App() {
  const [entries, setEntries] = useState<Array<Entry>>([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LogIn />}></Route>
            <Route
              path="/loggedIn"
              element={<Websocket entries={entries} setEntries={setEntries} />}
            >
              <Route
                path="ToDoList"
                element={<ToDoList entries={entries} setEntries={setEntries} />}
              />
              <Route path="UserManagement" element={<UserManagement />} />
            </Route>
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
