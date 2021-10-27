import React, {useState, useEffect} from "react";
import API from "./utils/API"
import UserContext from "./contexts/UserContext";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./pages/Home"
import Restaurant from "./pages/Restaurant"
import Nav from "./components/Nav"
import './App.css';
import {Login, Register} from "./auth"

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
//Checks login status, if the browser has user info stored (did not log out) then it will load this users info, otherwise it will display a "login" and "register" button in the navbar
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
        console.log("no token has been found");
      }
      const tokenRes = await API.postToken( null, {
        headers: { "x-auth-token": token },
      });
      console.log(tokenRes);
      if (tokenRes.data) {
        const userRes = await API.getUsers({
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
    <Router>
    <div className="App">
      <Nav/>
      <header className="App-header">
      <Route exact path = "/" component={Home} />
      <Route exact path = "/search" component={Restaurant} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      </header>
    </div>

    </Router>
    </UserContext.Provider>
  );
}

export default App;
