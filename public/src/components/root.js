import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// components
import logIn from "./LogIn/logIn";
import signIn from "./SignUp/signIn";
import Body from "./home/body";

function Root() {
  return (
    <BrowserRouter>
      <Route path="/login" component={logIn} />
      <Route exact path="/signin" component={signIn} />
      <Route exact path="/home" component={Body} />
    </BrowserRouter>
  );
}

export default Root;
