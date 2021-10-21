import React from "react";

function SearchList(props) {
  return (
    <>
        <ul>
      {props.restaurants.map((restaurant, i) => (
          <>
            <li key={i}>{restaurant}</li>
          </>
      ))}
      </ul>
    </>
  );
}
export default SearchList;
