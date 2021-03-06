import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import ErrorNotice from "../misc/ErrorNotice";
// import "./style.css";
import API from "../utils/API";

export default function Register() {
  const { userData } = useContext(UserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();
  const history = useHistory();
  const [setUser] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    //Creates a new user for DB
    try {
      const newUser = {
        username,
        password,
        passwordCheck,
        displayName,
        email
      };
      await API.createUser(newUser).then((res) => {
        const id = res.data._id;
        console.log(res)
        setUser(res.data);
        const loadUserInfo = async () => {
          await API.getUserById(id).then((res) => {
            console.log(res)
            setUser(res.data);
          });
        };
        loadUserInfo();
        //Pushes registered user to login page
        history.push("/login");
      });
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log(err);
    }
  };

  return (
    <div className="page container register-container">
      <UserContext.Provider value={{ userData }}>
        <h2 className="register-title">Register</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form register-form" onSubmit={submit}>
          <div className="row register-row">
            <label htmlFor="register-username">Username</label>
          </div>
          <div className="row register-row">
            <input
              id="register-username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="janedoe"
            />
          </div>

          <div className="row register-row">
            <label htmlFor="register-password">Password</label>
          </div>
          <div className="row register-row">
            <input
              id="register-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="xxxxxx"
            />
          </div>

          <div className="row register-row">
            <input
              type="password"
              placeholder="xxxxxx"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <div className="row register-row">
            <label htmlFor="register-display-name">Display name</label>
          </div>
          <div className="row register-row">
            <input
              id="register-display-name"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div className="row register-row">
            <input
              id="register-email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@gmail.com"
            />
          </div>
          <input className="register-btn" type="submit" value="Register" />
        </form>
      </UserContext.Provider>
    </div>
  );
}
