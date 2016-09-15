import React from 'react'

export default function(props){
  const date = new Date(props.post.datetime);
  const dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
  return (<div className="PostRead mdl-cell mdl-cell--12-col">
      <div className="PostRead-title">{props.post.title}</div>
      <div className="PostRead-subtitle">Posted by {props.post.username} on {dateString}</div>
      <div className="PostRead-content">{props.post.content}</div>
    </div>)
}
