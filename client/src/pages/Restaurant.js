import React, { useState } from "react";
import API from "../utils/API";
import SearchList from "../components/SearchList";

function Restaurant() {
  const [zipcode, setZipcode] = useState("");
  const [load, setLoad] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const newArr = [];

  const getRestaurant = async () => {
    await API.getRestaurant(zipcode).then((res) => {
      const value = res.data.data;
      value.map((x) => {
        var rest = x.restaurant_name;
        restaurants.push(rest);
        setLoad(false);
        return setRestaurants(restaurants);
      });
    });
  };

  const setRestaurant = (e) => {
    const { value } = e.target;
    setZipcode(value);
  };
  console.log(newArr);

  return (
    <>
      <input type="text" onChange={setRestaurant} />
      <button onClick={getRestaurant}>
        {" "}
        Search
      </button>
      {load === false && <SearchList restaurants={restaurants} />}
    </>
  );
}

export default Restaurant;
