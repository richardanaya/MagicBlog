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
    this.ref = firebase.database().ref("/timeline");
    this.handleTimeline = this.handleTimeline.bind(this);
  }

  handleTimeline(snapshot){
    this.setState(
      {
        timeline:snapshot.val()
      }
    )
  }

  componentDidMount() {
    this.ref.on("value",this.handleTimeline);
  }

  componentWillUnmount() {
    this.ref.off("value",this.handleTimeline);
  }

  render () {
    var timeline = [];

    for(var i in this.state.timeline){
      timeline.push(<div className="mdl-cell mdl-cell--6-col" key={this.state.timeline[i].post_id}><PostSummarized timelinePost={this.state.timeline[i]}></PostSummarized></div>)
    }

    return (
        <div className="CenterHolder">
          <div className="CenterHolder">
            <div className="mdl-grid">
              {timeline}
            </div>
          </div>;
        </div>
    );
  }
}


IndexContainer = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(IndexContainer);

export default IndexContainer;
