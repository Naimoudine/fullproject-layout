import { Outlet, NavLink } from "react-router-dom";
import "./App.css";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState();

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/Register">Register</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet context={{ auth, setAuth }} />
    </>
  );
}

export default App;
