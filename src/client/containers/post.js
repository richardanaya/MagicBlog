import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import PostRead from '../components/postRead'
import PostEdit from '../components/postEdit'
import {listenToPost} from '../firebase'

class PostContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
        post: {
          title: "",
          username: props.app.name,
          datetime: (new Date).getTime(),
          content: "",
          comments: []
        }
    }
  }

  componentDidMount() {
    //get latest story
    var ref = firebase.database().ref("/posts/"+this.props.params.userID+"/"+this.props.params.postID);
    ref.on("value",(snapshot)=>{
      var latestPost = snapshot.val();
      this.setState(
        {
          ...this.state,
          post:latestPost
        }
      )
    })
  }

  render () {
    var contents = (<PostRead post={this.state.post}/>);

    return (
        <div className="CenterHolder">
          <div className="CenterHolder">
            <div className="mdl-grid">
              {contents}
            </div>
          </div>;
        </div>
    );
  }
}


PostContainer = connect(
    state => ()=>({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(PostContainer);

export default PostContainer;
