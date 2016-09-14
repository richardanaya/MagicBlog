import React, { Component } from 'react'

import { Router, Route, Link } from 'react-router'

export default function(props){
  var {uid,post_id,datetime,title,username,summary} = props.timelinePost;



  return (<div className="PostSummary">
      <div className="PostSummary-title"><Link to={'/post/'+uid+"/"+post_id}>{title}</Link></div>
      <div className="PostSummary-subtitle">Posty by {username} on {datetime}</div>
      <div className="PostSummary-summary">{summary}</div>
    </div>)
}
