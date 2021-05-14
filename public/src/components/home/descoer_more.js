import React, { Component } from "react";
import _ from "underscore";
import $ from "jquery";
import randomcolor from "randomcolor";

import Card from "./sub_components/card";

import "./css/descoer_more.css";
import "./css/setion.css";

export class descoer_more extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], loding: true, allTag: [], findTag: [], name: "" };
    this.searchName = React.createRef();
    this.searchbut = React.createRef();
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          name: "Avengers: Endgame",
          img: require("../../img/unnamed.png"),
          id: 0,
          like: false,
          bookmark: false,
          tag: ["most viewed", "nice"],
        },
        {
          name: "black panther",
          img: require("../../img/black-panther-web.png"),
          id: 1,
          like: true,
          bookmark: false,
          tag: ["most viewed", "nice"],
        },
        {
          name: "star wars the last jedi",
          img: require("../../img/star-wars-the-last-jedi-movie-poster.png"),
          id: 2,
          like: false,
          bookmark: true,
          tag: ["most viewed", "nice"],
        },
        {
          name: "Batman: The Dark Knight Rises",
          img: require("../../img/71jzMH-kHQL._AC_SL1000_.jpg"),
          id: 3,
          like: false,
          bookmark: false,
          tag: ["nice"],
        },
        {
          name: "My Hero Academia The Movie Heroes Rising",
          img: require("../../img/teeeeee.jpg"),
          id: 4,
          like: true,
          bookmark: true,
          tag: ["most viewed"],
        },
      ],
      loding: false,
      allTag: [],
    });

    this.setState({ allTag: ["most viewed", "nice"] }, () => {
      this.setState({ findTag: [this.state.allTag[1]] });
    });
  }

  SetTag = (e) => {
    let target = $(e.target).attr("data");
    console.log($(target).attr("data"));

    let color = $(e.target).css("border-color");
    if ($(e.target).hasClass("act")) {
      $(e.target).css({ "background-color": "transparent" });
      $(e.target).removeClass("act");
    } else {
      console.log($(e.target));
      $(e.target).css({ "background-color": color });
      $(e.target).addClass("act");
    }

    let temp = this.state.findTag;
    if (temp.includes(target)) {
      temp.pop(temp.indexOf(target));
    } else {
      temp[temp.length] = target;
    }
    console.log(temp);
    this.setState({ findTag: temp });
  };

  nameCh = (e) => {};
  findName = () => {};
  render() {
    return (
      <div id="ch" className="new_c">
        <div style={{ "background-color": "#007DFF" }} class="name">
          <p>descoer more</p>
        </div>

        <div className="Ch">
          <div className="a">
            <input type="search" id="search" ref={this.searchName}></input>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.findName}
              ref={this.searchbut}
              id="go_search"
            >
              {" "}
              search{" "}
            </button>
          </div>

          <div className="cat">
            {this.state.allTag.map((data) => (
              <button
                type="button"
                className={
                  this.state.findTag.indexOf(data) != -1
                    ? "btn btn-primary act"
                    : "btn btn-primary"
                }
                onClick={this.SetTag}
                to="go_search"
                data={data}
                style={{
                  "border-color": randomcolor(),
                  color: randomcolor({ luminosity: "light" }),
                  "background-color":
                    this.state.findTag.indexOf(data) != -1
                      ? `${randomcolor({ luminosity: "dark" })}`
                      : "btn btn-primary",
                }}
              >
                # {data}
              </button>
            ))}
          </div>
        </div>

        <div id="list" className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div id="railWay">
                {this.state.data
                  .filter((data) =>
                    //console.log(_.intersection(this.state.findTag, data.tag))
                    data.tag.includes(
                      _.intersection(this.state.findTag, data.tag)[0]
                    )
                  )
                  .map((data) => (
                    <Card
                      key={data.id}
                      ID={data.id}
                      name={data.name}
                      img={data.img}
                      like={data.like}
                      bookmark={data.bookmark}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default descoer_more;
