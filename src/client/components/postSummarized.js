import React, { Component } from 'react'

import { Router, Route, Link } from 'react-router'

export default function(props){
  return (<div>Post summary <Link to={'/post/'+props.timelinePost.uid+"/"+props.timelinePost.post_id}>Link</Link></div>)
}
