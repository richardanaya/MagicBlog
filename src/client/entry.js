import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import App from "./components/app"
import Index from "./components/index"
import About from "./components/about"
import reducers from './reducers'
import "./styles/app.less"
import thunk from 'redux-thunk';
import {login,loadProfile,logout} from "./actions"
import {auth0,lock} from "./auth0"

const middleware = [thunk,routerMiddleware(browserHistory)]

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        app: reducers,
        routing: routerReducer
    }),
    applyMiddleware(...middleware)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}/>
          <Route path="about" component={About}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
)

var storedToken = localStorage.getItem("id_token");
if(storedToken !== null){
  var idToken = storedToken;

  var options = {
    id_token : idToken,
    target: '9RjVS1keVE6dzidUUIaeKKxwCYkeClgG',
    api : 'firebase'
  };

  // Make a call to the Auth0 '/delegate'
  auth0.getDelegationToken(options, function(err, result) {
    if(!err) {
      // Exchange the delegate token for a Firebase auth token
      firebase.auth().signInWithCustomToken(result.id_token).then(function(){
        store.dispatch(login(result.id_token))
        lock.getProfile(idToken, function (err, profile) {
          if (err) {
            return alert('There was an error getting the profile: ' + err.message);
          }
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
        // Exchange the delegate token for a Firebase auth token
        firebase.auth().signInWithCustomToken(result.id_token).then(function(){
          store.dispatch(login(result.id_token))
          lock.getProfile(idToken, function (err, profile) {
            if (err) {
              return alert('There was an error getting the profile: ' + err.message);
            }
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
