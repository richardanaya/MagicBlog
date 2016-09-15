import React from 'react'

import { Link } from 'react-router'

export default function(props){
  const {uid,post_id,datetime,title,username,summary} = props.timelinePost;
  const date = new Date(datetime);
  const dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
  return (<Link className="PostSummary mdl-card mdl-shadow--2dp" to={'/post/'+uid+"/"+post_id}>
      <div className="PostSummary-title">{title}</div>
      <div className="PostSummary-subtitle">Posted by {username} on {dateString}</div>
      <div className="PostSummary-summary">{summary}</div>
    </Link>)
}
