import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import Header from '../components/header'
import Footer from '../components/footer'

function AppContainer(props){
  return (
    <div>
        <Header/>
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
