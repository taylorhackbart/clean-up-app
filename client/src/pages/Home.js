import React, { useState } from "react";
import API from "../utils/API";

function Home() {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([])
  const [load, setLoad] = useState(false)
  const saveUserInfo = () => {
    // e.preventDefault()
    API.saveUser(user).then((res) => {
      console.log(res);
    });
    console.log("here");
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const getUserInfo = () => {
    API.getUser().then(res => {
      console.log(res)
      setAllUsers(res.data)
      setLoad(true)
    })
  }
  return (
    <>
      <div>Hello</div>
      <form>
        <input type="text" onChange={handleUserChange} name="name" />
        <input type="text" onChange={handleUserChange} name="username" />
        <input type="text" onChange={handleUserChange} name="email" />
        <button type="submit" onClick={saveUserInfo}>
          {" "}
          Submit{" "}
        </button>
      </form>
      <>
      <button onClick={getUserInfo}> Get Users</button>
      <div>
        {load === true && (

        <ul>
          {allUsers.map((user) => (
            <>
              <li key={user.id}>{user.name} {user.username} {user.email} </li>
              {/* <li key={user.id}></li>
              <li key={user.id}> </li> */}
            </>
          ))}
        </ul>

        )}
      </div>
      </>
    </>
  );
}

export default Home;
