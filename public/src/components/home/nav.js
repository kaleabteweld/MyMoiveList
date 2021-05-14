import React, { Component } from "react";
import "./css/nav.css";

import popcorn from "../../img/icon/popcorn.png";
import acc from "../../img/icon/acc.png";

export default class nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark primary-color">
        <a className="navbar-brand">
          <img id="icon" src={popcorn} className="navbar-brand" />
        </a>
        <a className="navbar-brand" id="name" href="#">
          main
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav ml-auto">
            {
              // <li className="nav-item">
              //             <button id="n_s" className="nav_but dropdown-item">
              //               now showing
              //             </button>
              //           </li>
              //           <li className="nav-item">
              //             <button id="c_s" className="nav_but dropdown-item">
              //               coming soon
              //             </button>
              //           </li>
              //           <li className="nav-item">
              //             <button id="d_m" className="nav_but dropdown-item">
              //               descoer more
              //             </button>
              //           </li>
            }

            <li className="nav-item accou">
              <button id="accou">
                <img id="accout" className="accout" src={acc}></img>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
