export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_VIEWING_POST = "UPDATE_VIEWING_POST";
export const LOAD_PROFILE = "LOAD_PROFILE";
import {lock} from "./auth0"
import { push } from 'react-router-redux';
import {listenToPost} from './firebase'
import { browserHistory } from 'react-router'

export function createPost(post){
  return (dispatch,getState)=>{
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/posts/"+uid+"/").push();
    var name = getState().app.name;
    ref.set({
      datetime:post.datetime,
      username:name,
      title:post.title,
      content:post.content
    }).then(function(a){
        var timelineRef = firebase.database().ref("/timeline/").push();
        timelineRef.set({
          post_id:ref.key,
          datetime:post.datetime,
          uid:uid,
          username:name,
          title:post.title,
          summary:post.content.substring(0,120)
        })
        dispatch(push('/post/'+uid+"/"+ref.key))
    })
  }
}

export function updateViewingPost(post){
  return {
      type: UPDATE_VIEWING_POST,
      post
  };
}

export function auth0Login(){
  return (dispatch)=>{
    browserHistory.push('/')
    lock.show();
  }
}

export function login(loginToken){
  return {
      type: LOGIN,
      loginToken
  };
}

export function logout(){
  return {
      type: LOGOUT
  };
}

export function loadProfile(profile){
  return {
      type: LOAD_PROFILE,
      profile
  };
}
