import React, { Component } from 'react'
import Comment from './comment'
import CommentEdit from './commentEdit'
import CommentEntryArea from './commentEntryArea'

export default function(props){
  var date = new Date(props.post.datetime);
  var dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
  return (<div className="PostRead mdl-cell mdl-cell--12-col">
      <div className="PostRead-title">{props.post.title}</div>
      <div className="PostRead-subtitle">Posted by {props.post.username} on {dateString}</div>
      <div className="PostRead-content">{props.post.content}</div>
      <Comment/>
      <CommentEdit/>
      <CommentEntryArea/>
    </div>)
}
