import React, { Component } from 'react'

import { Router, Route, Link } from 'react-router'

export default function(props){
  var {uid,post_id,datetime,title,username,summary} = props.timelinePost;



  return (<div>
      <Link to={'/post/'+uid+"/"+post_id}>{title}</Link> by {username}
      {datetime}
      {summary}
    </div>)
}
