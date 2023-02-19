import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Pages/Home";
import MainBooks from "./Pages/Books/MainBooks";
import Books from "./Pages/Books/Books";
import FlipBook from "./Pages/Memory";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/memory">
          <FlipBook />
        </Route>
        <Route path="/mainBooks/:bookId">
          <Books />
        </Route>
        <Route path="/mainBooks">
          <MainBooks />
        </Route>
        <Route
          path="/charidy"
          component={() => {
            // window.location = "https://www.charidy.com/rabanim";
            window.location =
              "https://my.israelgives.org/he/fundme/haravshlomoansbacher";
            return null;
          }}
        />

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
export default MainRouter;
