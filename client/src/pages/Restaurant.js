import React, { useState } from "react";
import API from "../utils/API";

function Restaurant() {
  const [zipcode, setZipcode] = useState("");
  const [load, setLoad] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const newArr = []
  const getRestaurant = () => {
    API.getRestaurant(zipcode).then((res) => {
      console.log(res.data.data);
      const value = res.data.data;
      value.map(x => {
        var rest = x.restaurant_name
        newArr.push(rest)
        console.log(rest)
        setLoad(false);
        setRestaurants(newArr);
      })
    });
  };

  const setRestaurant = (e) => {
    const { name, value } = e.target;
    setZipcode(value);
  };
  console.log(newArr);

  return (
    <>
      <input type="text" onChange={setRestaurant} />
      <button onClick={getRestaurant}> Search</button>
      {load === false && (
        <ul>
          {restaurants.map((restaurant) => (
            <>
              <li key={restaurant.name}>{restaurant.name}</li>
            </>
          ))}
        </ul>
      )}
    </>
  );
}

export default Restaurant;
