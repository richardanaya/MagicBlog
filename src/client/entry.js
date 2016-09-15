import React from 'react'
import ReactDOM from 'react-dom'

import './firebase'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import AppContainer from "./containers/app"
import IndexContainer from "./containers/index"
import PostContainer from "./containers/post"
import PostEditContainer from "./containers/postEdit"

import "./styles/app.less"
import {login,loadProfile,logout} from "./actions"
import {auth0,lock} from "./auth0"
import store from './store'


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

function render(){
  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={AppContainer}>
            <IndexRoute component={IndexContainer}/>
            <Route path="post" component={PostEditContainer}/>
            <Route path="post/:userID/:postID" component={PostContainer}/>
          </Route>
        </Router>
      </Provider>,
      document.getElementById('app')
  )
}
render();


//Authentication & Restoration
var storedToken = localStorage.getItem("id_token");
var storedDelegationToken = localStorage.getItem("delegation_token");
var storedProfile = localStorage.getItem("profile");
var userID = localStorage.getItem("userID");

if(storedToken !== null && storedDelegationToken !== null && storedProfile !== null && userID !== null ){
  browserHistory.push("/")
  firebase.auth().signInWithCustomToken(storedDelegationToken).then(function(){
    store.dispatch(login(storedToken,userID));
    store.dispatch(loadProfile(JSON.parse(storedProfile)));
  }).catch(function(error) {
    store.dispatch(logout());
  });
}
else {
  lock.on("authenticated", function(authResult) {
    var idToken = authResult.idToken;

    // Set the options to retreive a firebase delegation token
    var options = {
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
          browserHistory.push("/");
          var uid = firebase.auth().currentUser.uid;
          localStorage.setItem("userID",uid);
          store.dispatch(login(authResult.idToken,uid))
          lock.getProfile(idToken, function (err, profile) {
            if (err) {
              return alert('There was an error getting the profile: ' + err.message);
            }
            localStorage.setItem("profile",JSON.stringify(profile));
            store.dispatch(loadProfile(profile))
          });
        }).catch(function(error) {
          debugger;
          store.dispatch(logout())
        });
      }
      else {
        debugger;
        store.dispatch(logout())
      }
    });
  });
}
