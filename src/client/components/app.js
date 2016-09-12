import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'

function app(props){
  var login =  (<div><button onClick={()=>props.actions.auth0Login()}>Login</button></div>);
  var logout = (<div><button onClick={()=>props.actions.logout()}>Logout</button></div>);
  var authSection = props.app.loginToken===null?login:logout;
  return (
    <div>
        {props.app.loginToken}
        {authSection}
        {props.children}
    </div>
  )
}

app = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(app);

export default app;
