import React, { Component } from 'react'
export default function(props){
  var timestamp = 1301090400;
  var date = new Date(props.post.datetime);
  var dateString = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
  return (<div>
    <div>Title: <input defaultValue={props.post.title} onChange={(e)=>props.onPostChange("title",e.target.value)}/></div>
    <div>Author: <input defaultValue={props.post.username} onChange={(e)=>props.onPostChange("username",e.target.value)}/></div>
    <div>Date: {dateString}</div>
    <div><textarea defaultValue={props.post.content} onChange={(e)=>props.onPostChange("content",e.target.value)}/></div>
    <div>
      <button onClick={props.onPostDelete} style={{display:(props.onPostDelete!==undefined?"block":"none")}}>Delete</button>
      <button onClick={props.onPostSave} style={{display:(props.onPostSave!==undefined?"block":"none")}}>Save</button>
      <button onClick={props.onPostCreate} style={{display:(props.onPostCreate!==undefined?"block":"none")}}>Create</button>
    </div>
  </div>)
}
