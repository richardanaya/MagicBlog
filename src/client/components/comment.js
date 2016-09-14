import React, { Component } from 'react'
export default function(props){
  var date = new Date(props.datetime);
  var dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
  return (<div className="Comment mdl-cell mdl-cell--12-col">
    <div className="Comment-title">{props.name} commented at {dateString}</div>
    <div className="Comment-comment">{props.comment}</div>
  </div>)
}
