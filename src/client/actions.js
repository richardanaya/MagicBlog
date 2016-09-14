export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_VIEWING_POST = "UPDATE_VIEWING_POST";
export const LOAD_PROFILE = "LOAD_PROFILE";
import {lock} from "./auth0"
import { push } from 'react-router-redux';
import {listenToPost} from './firebase'

export function createPost(post){
  return (dispatch)=>{
    var ref = firebase.database().ref("/posts/"+firebase.auth().currentUser.uid+"/").push();
    ref.set(post).then(function(a){
        dispatch(push('/post/'+ref.key))
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
