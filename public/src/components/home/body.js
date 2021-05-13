import React, { useState, useContext, useRef } from "react";

//context
import { UserContext } from "../../context/userContext";
function Root() {
  //context
  const [userState, setUserState] = useContext(UserContext);
  console.log(userState);

  return <h1>hi</h1>;
}

export default Root;
