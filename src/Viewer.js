import React, { Component } from "react";
import { view } from "react-easy-state";

import "./css/theme-ben.css";
import store from "./store.js";
import qs from "qs";
import ReactMarkdown from "react-markdown";

class Viewer extends Component {
  constructor(props) {
    super(props);

    var query = qs.parse(window.location.search.substring(1));
    if (query.gist !== undefined) {
      this.state = { loading: true };
      fetch(`${query.gist}?r=${Math.random()}`)
        .then(response => response.json())
        .then(json => this.setState({ data: { src: json }, loading: false }));
    } else {
      this.state = { data: store, loading: false };
    }
  }

  render() {
    var classNames = [];
    if (this.props.printOnly) classNames.push("print-only");
    if (this.props.displayOnly) classNames.push("display-only");

    if(!this.state.loading) {
      let workHistories = this.state.data.src.resume.work
      workHistories.forEach((workHistory) => {
        if(!workHistory.roles || workHistory.roles.length === 0) {
          workHistory.roles = [
            {
              "role": workHistory.role,
              "startDate": workHistory.startDate,
              "endDate": workHistory.endDate
            }
          ]
        }
      })

      return (
        <div id="viewer" className={classNames.join(" ")}>
          <div id="theme-ben">
            <div className="name">
              {this.state.data.src.resume.firstName ? (
                <span className="first">
                  {this.state.data.src.resume.firstName}
                </span>
              ) : (
                  ""
                )}
              {this.state.data.src.resume.lastName ? (
                <span className="last">
                  {this.state.data.src.resume.lastName}
                </span>
              ) : (
                  ""
                )}
            </div>

            {this.state.data.src.resume.blurb ||
              this.state.data.src.resume.role ? (
                <div className="role-and-blurb">
                  <hr />
                  {this.state.data.src.resume.blurb ? (
                    <div className="blurb">{this.state.data.src.resume.blurb}</div>
                  ) : (
                      ""
                    )}
                  {this.state.data.src.resume.role ? (
                    <div className="role">{this.state.data.src.resume.role}</div>
                  ) : (
                      ""
                    )}
                </div>
              ) : (
                ""
              )}

            <div className="row">
              <div className="col-xs-5 col-left">
                <div className="section left personal">
                  <div className="title">Personal</div>
                  <div className="items">
                    {Array.apply(null, this.state.data.src.resume.personal).map(
                      function (item, i) {
                        return (
                          <div key={"personal-item-" + i}>
                            <div className="item-name">{item.field}</div>
                            {Array.apply(null, item.text).map(function (item, j) {
                              return (
                                <div
                                  key={"personal-item-text-" + i + "-" + j}
                                  className="text"
                                >
                                  {item}
                                </div>
                              );
                            }, this)}
                            {i !==
                              this.state.data.src.resume.personal.length - 1 ? (
                                <hr />
                              ) : (
                                ""
                              )}
                          </div>
                        );
                      },
                      this
                    )}
                  </div>
                </div>

                <div className="section left education">
                  <div className="title">Education</div>
                  <div className="items">
                    {Array.apply(null, this.state.data.src.resume.education).map(
                      function (item, i) {
                        return (
                          <div key={"education-item-" + i}>
                            {item.startDate && item.endDate ? (
                              <div className="date">
                                {item.startDate + " - " + item.endDate}
                              </div>
                            ) : null}
                            <div className="place">{item.name}</div>
                            <div className="degree">{item.degree}</div>
                            {i !==
                              this.state.data.src.resume.education.length - 1 ? (
                                <hr />
                              ) : (
                                ""
                              )}
                          </div>
                        );
                      },
                      this
                    )}
                  </div>
                </div>

                <div className="section left skills">
                  <div className="title">Skills</div>
                  <div className="items">
                    {Array.apply(null, this.state.data.src.resume.skills).map(
                      function (item, i) {
                        return (
                          <div key={"skill-item-" + i}>
                            <div className="name-and-stars">
                              <div className="stars">
                                {Array.apply(null, Array(item.stars)).map(
                                  function (item, j) {
                                    return (
                                      <div
                                        key={"skill-item-star-" + j}
                                        className="star glyphicon glyphicon-star"
                                      ></div>
                                    );
                                  },
                                  this
                                )}
                                {Array.apply(null, Array(5 - item.stars)).map(
                                  function (item, j) {
                                    return (
                                      <div
                                        key={"skill-item-unstar-" + j}
                                        className="unstar glyphicon glyphicon-star"
                                      ></div>
                                    );
                                  },
                                  this
                                )}
                              </div>
                              <div className="item-name">{item.field}</div>
                            </div>
                            {item.started || item.subskills ? <hr /> : ""}
                            {item.started ? (
                              <div className="text">
                                {new Date().getFullYear() - item.started} years
                                experience
                            </div>
                            ) : (
                                ""
                              )}
                            <div className="subskills">
                              {item.subskills ? (
                                <div className="row nopadding">
                                  {Array.apply(null, item.subskills).map(function (
                                    item,
                                    i
                                  ) {
                                    return (
                                      <div key={"subskill-" + i}>
                                        <div className="col-xs-4 nopadding">
                                          <div className="tick glyphicon glyphicon-ok"></div>
                                          <span className="subskill-name">
                                            {item}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  },
                                    this)}
                                </div>
                              ) : (
                                  ""
                                )}
                            </div>
                          </div>
                        );
                      },
                      this
                    )}
                  </div>
                </div>
              </div>

              <div className="col-xs-7 col-right">
                <div className="section right work-history">
                  <div className="title">Work History</div>
                  <div className="items">
                    {Array.apply(null, workHistories).map(
                      function (item, i) {
                        return (
                          <div key={"work-item-" + i}>
                            <div className="place">{item.name}</div>
                            {Array.apply(null, item.roles).map(function (item, i) {
                              return (
                                <div key={i}>
                                  <div className="role">{item.role}</div>
                                  <div className="date">
                                    {item.startDate + " - " + item.endDate}
                                  </div>
                                </div>
                              )
                            })
                            }
                            {Array.apply(null, item.text).map(function (item, j) {
                              return (
                                <div
                                  key={"work-history-item-text-" + i + "-" + j}
                                >
                                  {item === "" ? (
                                    <br />
                                  ) : (
                                      <div className="text">
                                        <ReactMarkdown source={item} />
                                      </div>
                                    )}
                                </div>
                              );
                            }, this)}
                            {i !== this.state.data.src.resume.work.length - 1 ? (
                              <hr />
                            ) : (
                                ""
                              )}
                          </div>
                        );
                      },
                      this
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default view(Viewer);
