import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import { Router, Route, Link } from 'react-router'

function Header(props){
  var login =  (<a href="#" onClick={()=>props.actions.auth0Login()}>Login</a>);
  var logout = (<a href="#" onClick={()=>props.actions.logout()}>Logout</a>);
  var authSection = props.app.loginToken===null?login:logout;
  return (<div><Link to={'/'}>Home</Link> <Link to={'/post'}>Create</Link> {authSection} {props.app.name}</div>)
}

Header = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(Header);

export default Header;
