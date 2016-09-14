import React, { Component } from 'react'
export default function(props){
  return (<div className="mdl-cell mdl-cell--12-col">
    <div>Title: <input defaultValue={props.post.title} onChange={(e)=>props.onPostChange("title",e.target.value)}/></div>
    <div><textarea defaultValue={props.post.content} onChange={(e)=>props.onPostChange("content",e.target.value)}/></div>
    <div>
      <button onClick={props.onPostDelete} style={{display:(props.onPostDelete!==undefined?"block":"none")}}>Delete</button>
      <button onClick={props.onPostSave} style={{display:(props.onPostSave!==undefined?"block":"none")}}>Save</button>
      <button onClick={props.onPostCreate} style={{display:(props.onPostCreate!==undefined?"block":"none")}}>Create</button>
    </div>
  </div>)
}
