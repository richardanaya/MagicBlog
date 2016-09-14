import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import { Router, Route, Link } from 'react-router'

function Header(props){
  var login =  (<a href="#" className="mdl-layout__tab" onClick={()=>props.actions.auth0Login()}>Login</a>);
  var logout = (<a href="#" className="mdl-layout__tab" onClick={()=>props.actions.auth0Logout()}>Logout</a>);
  var authSection = props.app.loginToken===null?login:logout;
  var writeLink = props.app.loginToken===null?null:(<Link className="mdl-layout__tab" to={'/post'}>Write</Link>);
  var profile = props.app.loginToken===null?null:(<span className="ProfileUser mdl-layout__tab"><img src={props.app.picture}/>{props.app.name}</span>);
  return (
    <div>
    <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
      <div className=" mdl-layout__header-row">
      </div>
      <div className=" mdl-layout__header-row" style={{paddingLeft:0,paddingRight:0}}>
        <h3>Magic Blog</h3>
      </div>
      <div className=" mdl-layout__header-row">
      </div>
      <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark" style={{paddingLeft:0,paddingRight:0}}>
        <div className="LinkHolder">
          <Link className="mdl-layout__tab" to={'/'}>Home</Link>
          {writeLink}
          {authSection}
          {profile}
        </div>
      </div>
    </header>
    </div>)
}

Header = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(Header);

export default Header;
