import React, { Component } from "react";
import Card from "./sub_components/Card_";

import "./css/new_movies.css";
import "./css/setion.css";

class new_movies extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], loding: true };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=2a102938319ee2e139f85d37dd569050"
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ data, loding: false });
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }

  render() {
    console.log(this.state.loding);
    if (this.state.loding) {
      return (
        <div className="new_c">
          <div className="loader-wrapper">
            <span className="loader">
              <span className="loader-inner"></span>
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="new_c">
          <div style={{ "background-color": "#FF00FC" }} className="name">
            <p>New comming..</p>
          </div>

          <div id="list" className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div id="railWay">
                  {this.state.data.results.map((data) => (
                    <Card key={data._id} data={data} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default new_movies;
