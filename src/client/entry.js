import React from 'react'
import ReactDOM from 'react-dom'

import './firebase'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import AppContainer from "./containers/appContainer"
import IndexContainer from "./containers/indexContainer"
import PostContainer from "./containers/postContainer"
import PostCreateContainer from "./containers/postCreateContainer"
import PostEditContainer from "./containers/postEditContainer"
import "./styles/app.less"
import {bootstrap} from "./actions"
import store from './store'


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={IndexContainer}/>
          <Route path="post" component={PostCreateContainer}/>
          <Route path="post/edit/:userID/:postID" component={PostEditContainer}/>
          <Route path="post/:userID/:postID" component={PostContainer}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
);

if(window.location.pathname != "/"){
  window.location = window.location.protocol+"//"+window.location.host;
}
