import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "./pages/Home";
import React from "react";
import "./App.css";

const App = () => (
  <Router>
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
    >
      <Route exact path="/" component={Home} />
    </AnimatedSwitch>
  </Router>
);

export default App;
