import React from "react";
import { GiCardPickup } from "react-icons/gi";
// Adding in event listener to toggle nav-burger
document.addEventListener("DOMContentLoaded", () => {
  const navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  if (navbarBurgers.length > 0) {
    navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const targets = document.getElementById(target);
        el.classList.toggle("is-active");
        targets.classList.toggle("is-active");
      });
    });
  }
});

function Nav() {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <GiCardPickup />
          </a>

          <a
            role="button"
            className="navbar-burger"
            data-target="navMenu"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu" id="navMenu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/search" className="navbar-item">
              Search
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
