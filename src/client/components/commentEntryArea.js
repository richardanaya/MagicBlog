import React, { Component } from 'react'
export default function(props){
  return (<div className="mdl-cell mdl-cell--12-col">
    <div className="CommentEntry mdl-textfield mdl-js-textfield">
      <textarea className="mdl-textfield__input" type="text" rows= "3" id="sample5" value={props.newComment} onChange={(e)=>props.onCommentChange(e.target.value)}></textarea>
      <label className="mdl-textfield__label" htmlFor="sample5" style={{display:(props.newComment.length>0?"none":"inline-block")}}>My comment ...</label>
    </div>
    <div>
      <a className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={props.onComment} style={{display:(props.onComment!==undefined?"inline-block":"none")}}>Add Comment</a>
    </div>
  </div>)
}
