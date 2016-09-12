import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'

class index extends Component {
  constructor (props) {
    super(props);
    //this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
  }


  render () {

    return (
        <div>
          Hey!
        </div>
    );
  }
}


index = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(index);

export default index;
