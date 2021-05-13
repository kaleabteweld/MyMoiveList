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
    pass: useRef(),
  };
  let emailCh = (event) => {
    let target = $(input_ele["email"].target);
    setemail(target.val());
  };
  let passCh = (event) => {
    let target = $(input_ele["pass"].target);
    setepass(target.val());
  };

  //login butt
  let Submit = (event) => {
    event.preventDefault();
    let data = {
      email: $(input_ele["email"].current).val(),
      password: $(input_ele["pass"].current).val(),
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

        // setUserState({
        //   ...userState,

        // })

        // logIn done go back to home
        setRedirect("home");

        // get user data
        // axios
        //   .get("http://localhost:4000/api/users/me", {
        //     headers: { "x-auth-token": response.headers["x-auth-token"] },
        //   })
        //   .then(function (response) {
        //     dispatch(
        //       log_in_ac({
        //         data: response.data,
        //         token: localStorage.getItem("auth-token"),
        //       })
        //     );
        //   });

        //setauth_state_st(true);
      })
      .catch((error) => {
        console.log(error.response);
        $(".main .form_sig .form-group input.is-invalid").removeClass(
          "is-invalid"
        );
        if (error.response !== undefined) {
          if (error.response.data.error_type === "joi") {
            console.log(input_ele[error.response.data.error]);
            error.response.data.error.map((err) => {
              console.log(err.context.key);
              $(input_ele[err.context.key].current).addClass("is-invalid");
              $(input_ele[err.path].current)
                .siblings(".invalid-feedback")
                .text(err.message);
            });
          }
          if (error.response.data.error_type === "mongoose") {
            alert(error.response.data.error);
            $(".main .form_sig .form-group input").val("");
          }
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
              name="pass"
              className="form-control"
              id="pass"
              placeholder="*******"
              value={pass}
              ref={input_ele["pass"]}
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
    );
  }
}

export default LogIn;
