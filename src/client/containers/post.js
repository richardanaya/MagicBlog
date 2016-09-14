import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import PostRead from '../components/postRead'
import PostEdit from '../components/postEdit'
import {listenToPost} from '../firebase'
import Comment from '../components/comment'
import CommentEdit from '../components/commentEdit'
import CommentEntryArea from '../components/commentEntryArea'

class PostContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
        post: {
          title: "",
          username: props.app.name,
          datetime: (new Date).getTime(),
          content: "",
        },
        comments: [],
        newComment: ""
    }
    this.onComment = this.onComment.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
  }

  onCommentChange(comment) {
    this.setState({
      ...this.state,
      newComment: comment
    })
  }

  onComment() {
    var ref = firebase.database().ref("/posts/"+this.props.params.userID+"/"+this.props.params.postID+"/comments").push();

    ref.set({
      name: "blah",
      datetime: (new Date).getTime(),
      comment:this.state.newComment
    }).then(()=>{
      this.setState({
        ...this.state,
        newComment: ""
      })
    })
  }

  componentDidMount() {
    //get latest story
    var ref = firebase.database().ref("/posts/"+this.props.params.userID+"/"+this.props.params.postID);
    ref.on("value",(snapshot)=>{
      var latestPost = snapshot.val();
      var comments = [];
      for(var i in latestPost.comments){
        comments.push(latestPost.comments[i]);
      }
      this.setState(
        {
          ...this.state,
          post:latestPost,
          comments: comments
        }
      )
    })
  }

  render () {
    var comments = this.state.comments.map(c=>(<Comment key={c.datetime} comment={c.comment} name={c.name} datetime={c.datetime}/>))

    var commentsEntry = (this.props.app.loginToken==null)?null:(<CommentEntryArea name={this.props.app.name} newComment={this.state.newComment} onComment={this.onComment} onCommentChange={this.onCommentChange}/>);

    return (
        <div className="CenterHolder">
          <div className="CenterHolder">
            <div className="mdl-grid">
              <PostRead post={this.state.post}/>
              {comments}
              {commentsEntry}
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
