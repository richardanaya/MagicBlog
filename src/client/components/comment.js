import React, { Component } from 'react'
export default function(props){
  var date = new Date(props.datetime);
  var dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();

  var deleteButton = props.isMine?(<a className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={()=>props.onDeleteComment(props.cid)}>Delete</a>):null;

  return (<div className="Comment mdl-cell mdl-cell--12-col">
    <div className="Comment-title" >{props.name} commented at {dateString}</div>
    <div className="Comment-comment">{props.comment}</div>
    {deleteButton}
  </div>)
}
