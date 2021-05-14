import React, { useState, useRef, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

// css
import "./css/logIn.css";

//context
import { UserContext } from "../../context/userContext";

function LogIn() {
  //context
  const [userState, setUserState] = useContext(UserContext);
  //logIn state
  const [RedirectTo, setRedirect] = useState(
    userState.logIn_state ? "home" : "login"
  );
  const [email, setemail] = useState("");
  const [pass, setepass] = useState("");

  // input
  var input_ele = {
    email: useRef(),
    password: useRef(),
  };
  let emailCh = (event) => {
    let target = $(input_ele["email"].target);
    setemail(target.val());
  };
  let passCh = (event) => {
    let target = $(input_ele["password"].target);
    setepass(target.val());
  };

  //login butt
  let Submit = (event) => {
    event.preventDefault();
    let data = {
      email: $(input_ele["email"].current).val(),
      password: $(input_ele["password"].current).val(),
    };

    axios
      .post("http://localhost:4000/api/users/login", data)
      .then(function (response) {
        // handle success
        $(".main .form_sig .form-group input.is-invalid").removeClass(
          "is-invalid"
        );
        $(".main .form_sig .form-group input.is-invalid").addClass("is-valid");
        console.log("success Log In", response.data);
        localStorage.setItem("auth-token", response.headers["x-auth-token"]);

        // set user Data to conxet
        setUserState({
          ...response.data,
          logIn_state: true,
        });
        // logIn done go back to home
        setRedirect("home");
      })
      .catch((error) => {
        var error = error.response.data;
        console.log(error.response);
        $(".main .form_sig .form-group input.is-invalid").removeClass(
          "is-invalid"
        );
        if (error.error_type === "user") {
          $(input_ele["email"].current).addClass("is-invalid");
          $(input_ele["email"].current)
            .siblings(".invalid-feedback")
            .text(error.error);

          $(input_ele["password"].current).addClass("is-invalid");
          $(input_ele["password"].current)
            .siblings(".invalid-feedback")
            .text(error.error);
        } else if (
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
        }
      });
  };

  if (RedirectTo === "home") {
    return <Redirect to="/home" />;
  }
  if (RedirectTo === "new") {
    return <Redirect to="/signIn" />;
  } else {
    return (
      <div className="sub_root">
        <div className="main">
          <form className="form_sig" onSubmit={Submit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                id="email"
                placeholder="email@example.com"
                value={email}
                ref={input_ele["email"]}
                onChange={emailCh}
              ></input>
              <div id="error_email" className="invalid-feedback">
                <p>check your Email</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pass">password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="pass"
                placeholder="*******"
                value={pass}
                ref={input_ele["password"]}
                onChange={passCh}
              ></input>
              <div id="error_pass" className="invalid-feedback">
                <p>check your password</p>
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
                Log In
              </button>
              <Link to="/signIn" className="btn btn btn-primary">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
