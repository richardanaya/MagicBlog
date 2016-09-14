import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import PostSummarized from '../components/postSummarized'

class IndexContainer extends Component {
  constructor (props) {
    super(props);
    //this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
  }

  render () {
    return (
        <div>
          <PostSummarized></PostSummarized>
        </div>
    );
  }
}


IndexContainer = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(IndexContainer);

export default IndexContainer;
