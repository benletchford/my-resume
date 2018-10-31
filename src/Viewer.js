import React, { Component } from 'react';
import { view } from 'react-easy-state'

import './css/theme-ben.css'
import store from './store.js'


class Viewer extends Component {
  render() {
    var classNames = []
    if(this.props.printOnly) classNames.push("print-only")
    if(this.props.displayOnly) classNames.push("display-only")

    return (
      <div id="viewer" className={classNames.join(" ")}>
        <div id="theme-ben">
          <div className="name">
            {store.src.resume.firstName ? <span className="first">{store.src.resume.firstName}</span> : ''}
            {store.src.resume.lastName ? <span className="last">{store.src.resume.lastName}</span> : ''}
          </div>


          {store.src.resume.blurb || store.src.resume.role ?
            <div className="role-and-blurb">
              <hr/>
              {store.src.resume.blurb ? <div className="blurb">{store.src.resume.blurb}</div> : ''}
              {store.src.resume.role ? <div className="role">{store.src.resume.role}</div> : ''}
            </div>
          : ''}

          <div className="row">
            <div className="col-xs-5 col-left">
              <div className="section left personal">
                <div className="title">Personal</div>
                <div className="items">{Array.apply(null, store.src.resume.personal).map(function(item, i){
                  return (
                    <div key={"personal-item-" + i}>
                      <div className="item-name">{item.field}</div>
                      {Array.apply(null, item.text).map(function(item, j){
                        return (
                            <div key={"personal-item-text-" + i + "-" + j} className="text">{item}</div>
                        );
                      }, this)}
                      {(i !== store.src.resume.personal.length - 1) ? <hr /> : ''}
                    </div>
                  );
                }, this)}</div>
              </div>

              <div className="section left skills">
                <div className="title">Skills</div>
                <div className="items">{Array.apply(null, store.src.resume.skills).map(function(item, i){
                  return (
                    <div key={"skill-item-" + i}>
                      <div className="name-and-stars">
                        <div className="stars">
                          {Array.apply(null, Array(item.stars)).map(function(item, j){
                            return (<div key={"skill-item-star-" + j} className="star glyphicon glyphicon-star"></div>)
                          }, this)}
                          {Array.apply(null, Array(5 - item.stars)).map(function(item, j){
                            return (<div key={"skill-item-unstar-" + j} className="unstar glyphicon glyphicon-star"></div>)
                          }, this)}
                        </div>
                        <div className="item-name">{item.field}</div>
                      </div>
                      {(item.started || item.subskills) ? <hr /> : ''}
                      {(item.started) ? <div className="text">{new Date().getFullYear() - item.started} years experience</div> : ''}
                      <div className="subskills">
                        {(item.subskills) ? <div className="row nopadding">
                          {Array.apply(null, item.subskills).map(function(item, i){
                            return (
                              <div key={"subskill-" + i}>
                                <div className="col-xs-4 nopadding">
                                  <div className="tick glyphicon glyphicon-ok"></div>
                                  <span className="subskill-name">{item}</span>
                                </div>
                              </div>
                            )
                          }, this)}
                        </div> : ''}
                      </div>
                    </div>
                  );
                }, this)}</div>
              </div>
            </div>

            <div className="col-xs-7 col-right">
              <div className="section right work-history">
                <div className="title">Work History</div>
                <div className="items">{Array.apply(null, store.src.resume.work).map(function(item, i){
                  return (
                    <div key={"work-item-" + i}>
                      <div className="date">{item.startDate + " - " + item.endDate}</div>
                      <div className="place">{item.name}</div>
                      <div className="role">{item.role}</div>
                      {Array.apply(null, item.text).map(function(item, j){
                        return (
                          <div key={"work-history-item-text-" + i + '-' + j}>
                            <br />
                            {(item[0] === "*" && item[item.length - 1] === '*') ? (
                              <i><div className="text">{item.substring(1, item.length - 1)}</div></i>
                            ) : (
                              <div className="text">{item}</div>
                            )}
                          </div>
                        )
                      }, this)}
                      {(i !== store.src.resume.work.length - 1) ? <hr /> : ''}
                    </div>
                  )
                }, this)}</div>
              </div>

              <div className="section right education">
                <div className="title">Education</div>
                <div className="items">{Array.apply(null, store.src.resume.education).map(function(item, i){
                  return (
                    <div key={"education-item-" + i}>
                      <div className="date">{item.startDate + " - " + item.endDate}</div>
                      <div className="place">{item.name}</div>
                      <div className="degree">{item.degree}</div>
                      {(i !== store.src.resume.education.length - 1) ? <hr /> : ''}
                    </div>
                  )
                }, this)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default view(Viewer);
