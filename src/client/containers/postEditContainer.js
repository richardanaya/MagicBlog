import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import PostRead from '../components/postRead'
import PostEdit from '../components/postEdit'
import {listenToPost} from '../firebase'

class PostEditContainer extends Component {
  constructor (props) {
    super(props);
    this.ref = firebase.database().ref("/posts/"+this.props.params.userID+"/"+this.props.params.postID);
    this.onPostSave = this.onPostSave.bind(this);
    this.onPostChange = this.onPostChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.state = {
        post: {
          title: "",
          username: props.app.name,
          datetime: (new Date).getTime(),
          content: ""
        }
    };
  }

  onPostSave(){
      this.props.actions.updatePost(this.props.params.postID,this.state.post);
  }

  onPostChange(prop,val){
      const newState = this.state;
      newState.post[prop] = val;
      this.setState(newState);
  }

  handlePost(snapshot){
    if(!snapshot.exists()){
      browserHistory.push("/");
      return;
    }
    const latestPost = snapshot.val();
    this.setState(
      {
        ...this.state,
        post:latestPost
      }
    );
  }

  componentDidMount() {
    this.ref.on("value",this.handlePost);
  }

  componentWillUnmount() {
    this.ref.off("value",this.handlePost);
  }

  render () {
    const contents = (<PostEdit post={this.state.post} completeText="Save" onPostComplete={this.onPostSave} onPostChange={this.onPostChange}/>);

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


PostEditContainer = connect(
    state => ()=>({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(PostEditContainer);

export default PostEditContainer;
