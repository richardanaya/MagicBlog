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
    this.onPostCreate = this.onPostCreate.bind(this);
    this.onPostDelete = this.onPostDelete.bind(this);
    this.onPostSave = this.onPostSave.bind(this);
    this.onPostChange = this.onPostChange.bind(this);
    this.state = {
        post: {
          title: "",
          username: "",
          datetime: (new Date).getTime(),
          content: ""
        }
    }
  }

  onPostCreate(){
      this.props.actions.createPost(this.state.post);
  }

  onPostDelete(){

  }

  onPostSave(){

  }

  onPostChange(prop,val){
      var newState = this.state;
      newState.post[prop] = val;
      this.setState(newState);
  }

  componentDidMount() {
    if(this.props.params.postID){
      var ref = firebase.database().ref("/posts/google-oauth2|113101168187756225718/"+this.props.params.postID);
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
  }

  render () {
    var contents = null;
    if(this.props.params.postID){
      contents = (<PostRead post={this.state.post}/>)
    }
    else {
      contents = (<PostEdit post={this.state.post} onPostCreate={this.onPostCreate} onPostChange={this.onPostChange}/>)
    }

    return (
        <div>
          {contents}
        </div>
    );
  }
}


PostContainer = connect(
    state => ()=>({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(PostContainer);

export default PostContainer;
