import React, { useState, useContext, useRef } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

// css
import "./css/sign.css";

//context
import { UserContext } from "../../context/userContext";

function SignIn() {
  //context
  const [userState, setUserState] = useContext(UserContext);

  //logIn state
  const [RedirectTo, setRedirect] = useState(
    userState.logIn_state ? "home" : "login"
  );

  const [inputname, setinputname] = useState("");
  const [inputemail, setinputemail] = useState("");
  const [inputpass, setinputpass] = useState("");
  const [inputus_name, setinputus_name] = useState("");

  // input
  var input_ele = {
    name: useRef(),
    user_name: useRef(),
    email: useRef(),
    password: useRef(),
  };
  var Input = (event) => {
    let target = $(event.target);
    switch ($(target).attr("name")) {
      case "name":
        setinputname($(input_ele[target]).val());
        break;
      case "us_name":
        setinputus_name($(input_ele[target]).val());
        break;
      case "email":
        setinputemail($(input_ele[target]).val());
        break;
      case "password":
        setinputpass($(input_ele[target]).val());
        break;
      default:
        break;
    }
  };

  var Submit = (e) => {
    e.preventDefault();
    let data = {
      name: $(input_ele["name"].current).val(),
      user_name: $(input_ele["user_name"].current).val(),
      email: $(input_ele["email"].current).val(),
      password: $(input_ele["password"].current).val(),
    };

    axios
      .post("http://localhost:4000/api/Users/signIn", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        proxy: {
          host: "localhost",
          port: 4000,
        },
      })
      .then(function (response) {
        // handle success
        $(".main_s .form_sig .form-group input.is-invalid").removeClass(
          "is-invalid"
        );
        $(".main_s .form_sig .form-group input.is-invalid").addClass(
          "is-valid"
        );
        console.log("signIn success");
        localStorage.setItem("auth-token", response.headers["x-auth-token"]);

        // set user Data to conxet
        setUserState({
          ...response.data,
          logIn_state: true,
        });
        // signIn done go back to home
        setRedirect("home");
      })
      .catch(function (error) {
        // handle error
        $(".main_s .form_sig .form-group input").removeClass("is-invalid");
        console.log(error.response);
        var error = error.response.data;
        //type of error
        if (
          error.error_level === "Validation" &&
          error.error.error_type === "joi"
        ) {
          error.error.errors.map((joi_error) => {
            let key = joi_error.context.key;
            let message = joi_error.message;

            $(input_ele[key].current).addClass("is-invalid");
            $(input_ele[key].current)
              .siblings(".invalid-feedback")
              .text(message);
          });
        } else if (error.error_level === "mongoDB") {
          if (error.error_type === "duplicate_key") {
            var key = Object.keys(error.key)[0];
            console.log(key);
            $(input_ele[key].current).addClass("is-invalid");
            $(input_ele[key].current)
              .siblings(".invalid-feedback")
              .text("duplicate!");
          }
        }
      });
  };

  if (RedirectTo === "log") {
    return <Redirect to="/login" />;
  } else if (RedirectTo === "home") {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="main_s">
        <form className="form_sig" onSubmit={Submit}>
          <div className="T">
            <div className="form-group">
              <label for="name">your full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="name"
                value={inputname}
                onChange={Input}
                ref={input_ele["name"]}
              ></input>
              <div id="email_id" className="invalid-feedback">
                <p>Enter your Name</p>
              </div>
            </div>
          </div>
          <div className="T">
            <div className="form-group">
              <label for="us_name">your user name</label>
              <input
                type="text"
                className="form-control"
                id="us_name"
                name="us_name"
                placeholder="user name"
                value={inputus_name}
                onChange={Input}
                ref={input_ele["user_name"]}
              ></input>
              <div id="email_id" className="invalid-feedback">
                <p>Enter your Name</p>
              </div>
            </div>
          </div>

          <div className="T">
            <div className="form-group">
              <label for="emaill">Email</label>
              <input
                type="text"
                className="form-control"
                id="emaill"
                name="email"
                placeholder="email@example.com"
                value={inputemail}
                onChange={Input}
                ref={input_ele["email"]}
              ></input>
              <div className="invalid-feedback" id="error_email">
                <p>check your Email</p>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label for="passs">password</label>
            <input
              type="password"
              className="form-control"
              id="passs"
              name="password"
              placeholder="*******"
              value={inputpass}
              onChange={Input}
              ref={input_ele["password"]}
            ></input>
            <div className="invalid-feedback" id="error_pass">
              <p>
                check your password, Must Be less Than Or Equal 8 Charcter's
              </p>
            </div>
          </div>

          <div className="other">
            <button
              id="posts"
              type="submit"
              value="submit"
              className="btn btn-success"
            >
              {" "}
              sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
