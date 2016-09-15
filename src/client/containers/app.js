import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import Header from '../components/header'
import Footer from '../components/footer'

class AppContainer extends Component {
  constructor (props) {
    super(props);
  }

  render(){
    return (<div><Header/>
      <main className="mdl-layout__content">
      {this. props.children}
      </main>
    <Footer/></div>)
  }

  componentDidMount(){
      this.props.actions.bootstrap();
  }
}



AppContainer = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(AppContainer);

export default AppContainer;
