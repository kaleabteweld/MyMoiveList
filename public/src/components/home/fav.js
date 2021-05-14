import React, { useState, useContext, useEffect } from "react";
import Card from "./sub_components/Card_";

import "./css/new_movies.css";
import "./css/setion.css";

//context
import { UserContext } from "../../context/userContext";

function Fav() {
  //context
  const [userState, setUserState] = useContext(UserContext);
  const [data, setdata] = useState([]);
  var Data = [];

  useEffect(async () => {
    const liked = userState.like;

    await liked.map(async (like_) => {
      var Moive_id = String(like_.id);

      try {
        let json = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            Moive_id +
            "?api_key=2a102938319ee2e139f85d37dd569050"
        );
        json = await json.json();
        Data.push(json);
        //console.log(Data.length);
        setdata([...Data, json]);
      } catch (error) {
        console.log("err ", error);
      }
    });
  }, []);

  console.log("data ", data);
  return (
    <div className="new_c">
      <div style={{ "background-color": "#FF00FC" }} className="name">
        <p>Fav</p>
      </div>

      <div id="list" className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div id="railWay">
              {data.map((data) => (
                <Card key={data._id} data={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fav;
