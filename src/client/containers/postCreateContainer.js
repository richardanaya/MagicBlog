import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions'
import PostRead from '../components/postRead'
import PostEdit from '../components/postEdit'
import {listenToPost} from '../firebase'

class PostCreateContainer extends Component {
  constructor (props) {
    super(props);
    this.onPostCreate = this.onPostCreate.bind(this);
    this.onPostChange = this.onPostChange.bind(this);
    this.state = {
        post: {
          title: "",
          username: props.app.name,
          datetime: (new Date).getTime(),
          content: "",
          comments: []
        }
    };
  }

  onPostCreate(){
      this.props.actions.createPost(this.state.post);
  }

  onPostChange(prop,val){
      const newState = this.state;
      newState.post[prop] = val;
      this.setState(newState);
  }

  componentDidMount() {
    //reset if we are writing
    this.setState({
        post: {
          title: "",
          username: this.props.app.name,
          datetime: (new Date).getTime(),
          content: "",
          comments: []
        }
    });
  }

  render () {
    const contents = (<PostEdit post={this.state.post} completeText="Create" onPostComplete={this.onPostCreate} onPostChange={this.onPostChange}/>);

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


PostCreateContainer = connect(
    state => ()=>({app: state.app}),
    (dispatch)=>({ actions: bindActionCreators(actionCreators, dispatch) })
)(PostCreateContainer);

export default PostCreateContainer;
