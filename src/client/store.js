
import reducers from './reducers'
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const middleware = [thunk,routerMiddleware(browserHistory)]

// Add the reducer to your store on the `routing` key
export default createStore(
    combineReducers({
        app: reducers,
        routing: routerReducer
    }),
    applyMiddleware(...middleware)
);
