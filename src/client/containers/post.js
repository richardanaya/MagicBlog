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
import { browserHistory } from 'react-router'

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
    this.onDelete = this.onDelete.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
  }

  onCommentChange(comment) {
    this.setState({
      ...this.state,
      newComment: comment
    })
  }

  onDelete(){
    firebase.database().ref("/posts/"+this.props.params.userID+"/"+this.props.params.postID).remove()
    firebase.database().ref("/timeline").orderByChild("post_id").equalTo(this.props.params.postID).on("child_added", function(snapshot) {
      firebase.database().ref("/timeline/"+snapshot.key).remove()
    });
  }

  onComment() {
    var ref = firebase.database().ref("/posts/"+this.props.params.userID+"/"+this.props.params.postID+"/comments").push();
    debugger;
    ref.set({
      name: this.props.app.name,
      datetime: (new Date).getTime(),
      comment:this.state.newComment,
      creator:this.props.app.userID
    }).then(()=>{
      this.setState({
        ...this.state,
        newComment: ""
      })
    })
  }

  onDeleteComment(key) {
    firebase.database().ref("/posts/"+this.props.params.userID+"/"+this.props.params.postID+"/comments/"+key).remove();
  }

  componentDidMount() {
    //get latest story
    var ref = firebase.database().ref("/posts/"+this.props.params.userID+"/"+this.props.params.postID);
    ref.on("value",(snapshot)=>{
      if(!snapshot.exists()){
        browserHistory.push("/")
        return;
      }
      var latestPost = snapshot.val();
      var comments = [];
      for(var i in latestPost.comments){
        var comment = latestPost.comments[i];
        comment.id = i;
        comments.push(comment);
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
    var comments = this.state.comments.map(c=>(<Comment key={c.id} cid={c.id} comment={c.comment} name={c.name} datetime={c.datetime} isMine={c.creator == this.props.app.userID} onDeleteComment={this.onDeleteComment}/>))

    var commentsEntry = (this.props.app.loginToken==null)?null:(<CommentEntryArea name={this.props.app.name} newComment={this.state.newComment} onComment={this.onComment} onCommentChange={this.onCommentChange}/>);

    var madeBySame = false;
    if(this.props.app.userID !== null){
      madeBySame = this.props.params.userID == this.props.app.userID;
    }

    var deleteButton = madeBySame?(<a className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={this.onDelete}>Delete</a>):null;

    return (
        <div className="CenterHolder">
          <div className="CenterHolder">
            <div className="mdl-grid">
              <PostRead post={this.state.post}/>
              <div className="mdl-cell mdl-cell--12-col">{deleteButton}</div>
              <div className="mdl-cell mdl-cell--12-col"><h6>Comments</h6></div>
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
