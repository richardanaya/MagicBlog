import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import Header from '../components/header'
import Footer from '../components/footer'

function AppContainer(props){
  var login =  (<div><button onClick={()=>props.actions.auth0Login()}>Login</button></div>);
  var logout = (<div><button onClick={()=>props.actions.logout()}>Logout</button></div>);
  var authSection = props.app.loginToken===null?login:logout;
  return (
    <div>
        <Header/>
        {props.app.name}
        {authSection}
        {props.children}
        <Footer/>
    </div>
  )
}

AppContainer = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(AppContainer);

export default AppContainer;
