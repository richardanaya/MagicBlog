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

    this.handleTimeline = this.handleTimeline.bind(this);
    this.onMore = this.onMore.bind(this);
    this.count = 10;
  }

  handleTimeline(snapshot){
    var posts = [];
    var timelineVal = snapshot.val();
    for(var i in timelineVal){
      posts.push(timelineVal[i]);
    }
    posts.sort(function(a,b){
      return b.datetime-a.datetime;
    })
    this.setState(
      {
        timeline:posts
      }
    )
  }

  onMore(){
    this.ref.off("value",this.handleTimeline);
    this.count += 10;
    this.ref = firebase.database().ref("/timeline").orderByChild("datetime").limitToLast(this.count);
    this.ref.on("value",this.handleTimeline);
  }

  componentDidMount() {
    this.ref = firebase.database().ref("/timeline").orderByChild("datetime").limitToLast(this.count);
    this.ref.on("value",this.handleTimeline);
  }

  componentWillUnmount(){
    this.ref.off("value",this.handleTimeline)
  }

  render () {
    var timeline = [];

    for(var i in this.state.timeline){
      timeline.push(<div className="mdl-cell mdl-cell--6-col" key={this.state.timeline[i].post_id}><PostSummarized timelinePost={this.state.timeline[i]}></PostSummarized></div>)
    }

    var hasMore = timeline.length == this.count;
    var moreButton = hasMore?(<a className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={this.onMore}>More</a>):null;

    return (
        <div className="CenterHolder">
          <div className="CenterHolder">
            <div className="mdl-grid">
              {timeline}
            </div>
            {moreButton}
          </div>
        </div>
    );
  }
}


IndexContainer = connect(
    state => ({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(IndexContainer);

export default IndexContainer;
