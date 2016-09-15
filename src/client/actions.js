export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_VIEWING_POST = "UPDATE_VIEWING_POST";
export const LOAD_PROFILE = "LOAD_PROFILE";
import { push } from 'react-router-redux';
import {listenToPost} from './firebase'
import { browserHistory, Router } from 'react-router'
import {auth0,lock} from "./auth0"

export function bootstrap(){
  return (dispatch)=>{
    //Authentication & Restoration
    const storedToken = localStorage.getItem("id_token");
    const storedDelegationToken = localStorage.getItem("delegation_token");
    const storedProfile = localStorage.getItem("profile");
    const userID = localStorage.getItem("userID");

    if(storedToken !== null && storedDelegationToken !== null && storedProfile !== null && userID !== null ){
      firebase.auth().signInWithCustomToken(storedDelegationToken).then(function(){
        dispatch(login(storedToken,userID));
        dispatch(loadProfile(JSON.parse(storedProfile)));
        browserHistory.push("/")
      }).catch(function(error) {
        dispatch(logout());
      });
    }
    else {
      lock.on("authenticated", function(authResult) {
        const idToken = authResult.idToken;

        // Set the options to retreive a firebase delegation token
        const options = {
          id_token : idToken,
          target: '9RjVS1keVE6dzidUUIaeKKxwCYkeClgG',
          api : 'firebase'
        };

        // Make a call to the Auth0 '/delegate'
        auth0.getDelegationToken(options, function(err, result) {
          if(!err) {
            localStorage.setItem("delegation_token",result.id_token);
            // Exchange the delegate token for a Firebase auth token
            firebase.auth().signInWithCustomToken(result.id_token).then(function(){
              var uid = firebase.auth().currentUser.uid;
              localStorage.setItem("userID",uid);
              dispatch(login(authResult.idToken,uid));
              lock.getProfile(idToken, function (err, profile) {
                if (err) {
                  return alert('There was an error getting the profile: ' + err.message);
                }
                localStorage.setItem("profile",JSON.stringify(profile));
                dispatch(loadProfile(profile));
                browserHistory.push("/")
              });
            }).catch(function(error) {
              dispatch(logout());
            });
          }
          else {
            dispatch(logout());
          }
        });
      });
    }
  }
}

export function createPost(post){
  return (dispatch,getState)=>{
    const uid = getState().app.userID;
    var ref = firebase.database().ref("/posts/"+uid+"/").push();
    var name = getState().app.name;
    var newPost = {
      datetime:post.datetime,
      username:name,
      title:post.title,
      content:post.content
    };
    ref.set(newPost).then(function(a){
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

export function updatePost(key,post){
  return (dispatch,getState)=>{
    const uid = getState().app.userID;
    firebase.database().ref("/posts/"+uid+"/"+key).set(
      post
    ).then(function(){
        firebase.database().ref("/timeline").orderByChild("post_id").equalTo(key).once("child_added", function(snapshot) {
          var timeline = snapshot.val();
          var newTimeline = {
            ...timeline,
            title:post.title,
            summary:post.content.substring(0,120)
          }
          firebase.database().ref("/timeline/"+snapshot.key).set(newTimeline);
        });
        dispatch(push('/post/'+uid+"/"+key))
    })
  }
}

export function auth0Login(){
  return (dispatch)=>{
    browserHistory.push('/')
    lock.show();
  }
}

export function auth0Logout(){
  return (dispatch)=>{
    localStorage.removeItem('userID');
    localStorage.removeItem('id_token');
    localStorage.removeItem('delegation_token');
    localStorage.removeItem('profile');
    firebase.auth().signOut().then(function() {
      dispatch(logout())
      browserHistory.push("/");
    }, function(error) {
      console.log(error);
    });
  }
}

export function login(loginToken,userID){
  return {
      type: LOGIN,
      loginToken,
      userID
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
