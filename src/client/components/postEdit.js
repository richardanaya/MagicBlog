import React, { Component } from 'react'
export default function(props){
  return (<div className="PostEdit mdl-cell mdl-cell--12-col">
  <form action="#">
    <div className="mdl-textfield mdl-js-textfield">
      <input className="mdl-textfield__input" type="text" id="sample1" value={props.post.title} onChange={(e)=>props.onPostChange("title",e.target.value)}/>
      <label className="mdl-textfield__label" htmlFor="sample1"  style={{display:(props.post.title.length>0?"none":"auto")}}>Title...</label>
    </div>
    <br/>
    <div className="mdl-textfield mdl-js-textfield">
      <textarea className="mdl-textfield__input" type="text" rows= "3" id="sample5" value={props.post.content} onChange={(e)=>props.onPostChange("content",e.target.value)}></textarea>
      <label className="mdl-textfield__label" htmlFor="sample5" style={{display:(props.post.content.length>0?"none":"auto")}}>My article starts here...</label>
    </div>
    <div>
      <a className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={props.onPostComplete} style={{display:(props.onPostComplete!==undefined?"inline-block":"none")}}>{props.completeText}</a>
    </div>
  </form>

  </div>)
}
