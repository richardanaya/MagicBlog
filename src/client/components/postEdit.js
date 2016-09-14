import React, { Component } from 'react'
export default function(props){
  return (<div className="PostEdit mdl-cell mdl-cell--12-col">
  <form action="#">
    <div className="mdl-textfield mdl-js-textfield">
      <input className="mdl-textfield__input" type="text" id="sample1" defaultValue={props.post.title} onChange={(e)=>props.onPostChange("title",e.target.value)}/>
      <label className="mdl-textfield__label" htmlFor="sample1">Title...</label>
    </div>
    <br/>
    <div className="mdl-textfield mdl-js-textfield">
      <textarea className="mdl-textfield__input" type="text" rows= "3" id="sample5" defaultValue={props.post.content} onChange={(e)=>props.onPostChange("content",e.target.value)}></textarea>
      <label className="mdl-textfield__label" htmlFor="sample5">My article starts here...</label>
    </div>
    <div>
      <a className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={props.onPostDelete} style={{display:(props.onPostDelete!==undefined?"inline-block":"none")}}>Delete</a>
      <a className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={props.onPostSave} style={{display:(props.onPostSave!==undefined?"inline-block":"none")}}>Save</a>
      <a className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={props.onPostCreate} style={{display:(props.onPostCreate!==undefined?"inline-block":"none")}}>Create</a>
    </div>
  </form>

  </div>)
}
