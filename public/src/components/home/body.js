import React, { useState, useContext, useRef } from "react";

//components
import Nav from "./nav";
import Head from "./head";
import New_movies from "./new_movies";
import Comming_soon from "./comming_soon";
import Fav from "./fav";
import Descoer_more from "./descoer_more";
import Foot from "./foot";

import Card from "./sub_components/card";

//context
import { UserContext } from "../../context/userContext";

function Body() {
  //context
  const [userState, setUserState] = useContext(UserContext);
  console.log("body ", userState);

  // if (userState.logIn_state === true) {
  //   return (
  //     <React.Fragment>
  //       <Nav />
  //       <Head />

  //       <Fav />

  //       <Comming_soon />
  //       <New_movies />
  //       <Foot />
  //     </React.Fragment>
  //   );
  // } else {
  return (
    <React.Fragment>
      <Nav />
      <Head />

      <Comming_soon />
      <New_movies />
      <Foot />
    </React.Fragment>
  );
}
//}

export default Body;
