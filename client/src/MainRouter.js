import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Pages/Home";
import MainBooks from "./Pages/Books/MainBooks";
import Books from "./Pages/Books/Books";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/mainBooks/:bookId">
          {/* //   component={() => {
        //     window.location = "https://www.jgive.com/new/he/ils/contacts";
        //     return null;
        //   }}
        //  /> */}
          <Books />
        </Route>
        <Route path="/mainBooks">
          {/* //   component={() => {
        //     window.location = "https://www.jgive.com/new/he/ils/contacts";
        //     return null;
        //   }}
        //  /> */}
          <MainBooks />
        </Route>
        <Route
          path="/charidy"
          component={() => {
            window.location = "https://www.charidy.com/rabanim";
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
