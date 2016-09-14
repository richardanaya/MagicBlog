import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import PostSummarized from '../components/postSummarized'

class IndexContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      timeline:[]
    }
    //this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
  }

  componentDidMount() {
    var ref = firebase.database().ref("/timeline");
    ref.on("value",(snapshot)=>{
      this.setState(
        {
          timeline:snapshot.val()
        }
      )
    })
  }

  render () {
    var timeline = [];

    for(var i in this.state.timeline){
      timeline.push(<PostSummarized key={this.state.timeline[i].post_id} timelinePost={this.state.timeline[i]}></PostSummarized>)
    }

    return (
        <div>
          {timeline}
        </div>
    );
  }
}


IndexContainer = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(IndexContainer);

export default IndexContainer;
