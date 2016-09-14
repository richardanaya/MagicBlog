import React, { Component } from 'react'
import Comment from './comment'
import CommentEdit from './commentEdit'
import CommentEntryArea from './commentEntryArea'

export default function(props){
  var date = new Date(props.post.datetime);
  var dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
  return (<div className="mdl-cell mdl-cell--12-col">
      <div>{props.post.title}</div>
      <div>{props.post.username}</div>
      <div>{dateString}</div>
      <div>{props.post.content}</div>
      <Comment/>
      <CommentEdit/>
      <CommentEntryArea/>
    </div>)
}
