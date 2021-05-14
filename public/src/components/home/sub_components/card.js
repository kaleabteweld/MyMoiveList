import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";

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
// import { UserContext } from "../../../context/userContext";

var log_in = true;

export class card extends Component {
  constructor(props) {
    super(props);

    console.log("logo", logo);

    this.state = {
      set: false,
      like: this.props.like ? heart_ok : heart,
      book: this.props.bookmark ? wishlist : wishlist_,
      Redirect: false,
    };

    this.card = React.createRef();
    this.mask = React.createRef();
    this.but = React.createRef();
  }

  componentDidMount() {}

  cli = () => {
    var mask = $(this.mask.current);

    var but = $(this.but.current);

    if (this.state.set == false) {
      this.setState({ set: true });
      $(but).animate({ top: "0%" }, 1000, () => {
        $(but).css({ transform: "rotate(180deg)" });
      });
      $(mask).animate({ height: "100%", top: "0%" }, 1000, () => {});
    } else {
      $(but).animate({ top: "63%" }, 1000, () => {
        $(but).css({ transform: "rotate(360deg)" });
      });
      $(mask).animate({ height: "31%", top: "69%" }, 1000, () => {
        this.setState({ set: false });
      });
    }
  };
  like = () => {
    if (log_in) {
      this.setState({
        like: this.state.like == heart ? heart_ok : heart,
      });
    } else {
      this.setState({
        Redirect: "/logIn",
      });
    }
  };
  book = () => {
    if (log_in) {
      this.setState({
        book: this.state.book == wishlist ? wishlist_ : wishlist,
      });
    } else {
      this.setState({
        Redirect: "/logIn",
      });
    }
  };

  render() {
    if (this.state.Redirect != false) {
      return <Redirect to={this.state.Redirect} />;
    }
    if (this.state.set) {
      // console.log("card", this.props);
      //console.log("poster path: ", this.props.data.poster_path);
      return (
        <div className="data">
          <div className="Card" ref={this.card}>
            <img
              className="bg"
              src={
                "https://image.tmdb.org/t/p/original" +
                this.props.data.poster_path
              }
              alt=""
            ></img>
            <button className="more" ref={this.but} onClick={this.cli}>
              <img src={logo}></img>
            </button>
            <div className="mask" ref={this.mask}>
              <p className="title scroll-left">{this.props.data.name}</p>

              {
                // <div className="tag">
                // {this.props.data.map((data) => {
                //     if (data.genres != null) {
                //       data.genre.map((gData) => <button># {gData.name}</button>);
                //     }
                //   })}
                // </div>
              }

              <div className="des">
                <p>{this.props.data.overview}</p>
              </div>

              {
                //  <div className="la">
                //   <button>#English</button>
                //   <button>#English</button>
                //   <button>#English</button>
                //   <button>#English</button>
                //   <button>#English</button>
                // </div>
              }

              <div className="na">
                <img src={heart} id="heart"></img>
                <img src={wishlist} id="wishlist"></img>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log("card", this.props);
      return (
        <div className="data">
          <div className="Card" ref={this.card}>
            <img
              className="bg"
              src={
                "https://image.tmdb.org/t/p/original" +
                this.props.data.poster_path
              }
              alt=""
            ></img>
            <button className="more" ref={this.but} onClick={this.cli}>
              <img src={logo}></img>
            </button>
            <div className="mask" ref={this.mask}>
              <p className="title scroll-left">{this.props.data.name}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default card;
