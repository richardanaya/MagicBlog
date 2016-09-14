import React, { Component } from 'react'

import { Router, Route, Link } from 'react-router'

export default function(props){
  var {uid,post_id,datetime,title,username,summary} = props.timelinePost;
  var date = new Date(datetime);
  var dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
  return (<Link className="PostSummary mdl-card mdl-shadow--2dp" to={'/post/'+uid+"/"+post_id}>
      <div className="PostSummary-title">{title}</div>
      <div className="PostSummary-subtitle">Posted by {username} on {dateString}</div>
      <div className="PostSummary-summary">{summary}</div>
    </Link>)
}
