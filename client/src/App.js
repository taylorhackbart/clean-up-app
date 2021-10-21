import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./pages/Home"
import Restaurant from "./pages/Restaurant"
import Nav from "./components/Nav"
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <header className="App-header">
      <Route exact path = "/" component={Home} />
      <Route exact path = "/search" component={Restaurant} />
      </header>
    </div>

    </Router>
  );
}

export default App;
