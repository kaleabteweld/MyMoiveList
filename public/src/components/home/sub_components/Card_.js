import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

// css
import "../css/card.css";
import "../css/card_new.css";

// img
import logo from "../../../img/icon/__TEMP__SVG__.png";
import heart_ok from "../../../img/icon/heart_ok.png";
import heart from "../../../img/icon/heart.png";
import wishlist from "../../../img/icon/noun_wishlist_1381344.png";
import wishlist_ from "../../../img/icon/noun_wishlist.png";

//context
import { UserContext } from "../../../context/userContext";

function Card_(props) {
  //context
  const [userState, setUserState] = useContext(UserContext);
  //State
  const [set, setset] = useState(false);
  const [like, likeset] = useState(heart);
  const [book, bookset] = useState(wishlist_);
  const [Redirect_, Redirect_set] = useState(false);

  // ref
  var card_Ref = React.createRef();
  var mask_Ref = React.createRef();
  var but_Ref = React.createRef();

  useEffect(() => {
    if (userState.logIn_state) {
      userState.like.map((like_) => {
        if (like_.id === String(props.data.id)) {
          likeset(heart_ok);
        }
      });
      userState.book.map((book_) => {
        if (book_.id === String(props.data.id)) {
          bookset(wishlist);
        }
      });
    }
  }, []);

  // cil ab=ni
  function cli() {
    const mask = $(mask_Ref.current);
    const but = $(but_Ref.current);

    if (set === false) {
      $(but).animate({ top: "0%" }, 1000, () => {
        $(but).css({ transform: "rotate(180deg)" });
      });
      $(mask).animate({ height: "100%", top: "0%" }, 1000, () => {
        setset(true);
      });
    } else {
      $(but).animate({ top: "63%" }, 1000, () => {
        $(but).css({ transform: "rotate(360deg)" });
      });
      $(mask).animate({ height: "31%", top: "69%" }, 1000, () => {
        setset(false);
      });
    }
  }
  // like but
  function like_but() {
    if (userState.logIn_state) {
      let data = {
        movieID: String(props.data.id),
        updataType: like === heart ? "add" : "remove",
      };
      axios
        .post("http://localhost:4000/api/Users/me/like", data, {
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then(function (response) {
          // set new user Data to conxet
          setUserState({
            ...response.data,
            logIn_state: true,
          });

          likeset(like === heart ? heart_ok : heart);
        })
        .catch((error) => {
          var error = error.response.data;
          console.log(error);
        });
    } else {
      Redirect_set("/login");
    }
  }
  //book but
  function book_but() {
    if (userState.logIn_state) {
      bookset(book === wishlist ? wishlist_ : wishlist);
    } else {
      Redirect_set("/login");
    }
  }

  if (Redirect_ != false) {
    console.log("Redirect_: " + Redirect_);
    return <Redirect to="/login" />;
  } else if (set) {
    return (
      <div className="data">
        <div className="Card" ref={card_Ref}>
          <img
            className="bg"
            src={"https://image.tmdb.org/t/p/original" + props.data.poster_path}
            alt=""
          ></img>
          <button className="more" ref={but_Ref} onClick={cli}>
            <img src={logo}></img>
          </button>
          <div className="mask" ref={mask_Ref}>
            <p className="title scroll-left">{props.data.title}</p>

            {
              // <div className="tag">
              // {props.data.map((data) => {
              //     if (data.genres != null) {
              //       data.genre.map((gData) => <button># {gData.name}</button>);
              //     }
              //   })}
              // </div>
            }

            <div className="des">
              <p>{props.data.overview}</p>
            </div>

            <div className="la">
              <button>#{props.data.original_language}</button>
            </div>

            <div className="na">
              <img src={like} onClick={like_but} id="heart"></img>
              <img src={book} onClick={book_but} id="wishlist"></img>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="data">
        <div className="Card" ref={card_Ref}>
          <img
            className="bg"
            src={"https://image.tmdb.org/t/p/original" + props.data.poster_path}
            alt=""
          ></img>
          <button className="more" ref={but_Ref} onClick={cli}>
            <img src={logo}></img>
          </button>
          <div className="mask" ref={mask_Ref}>
            <p className="title scroll-left">{props.data.original_title}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card_;
