
import {LOGIN,LOGOUT,LOAD_PROFILE,UPDATE_VIEWING_POST} from "./actions"
import  {LOCATION_CHANGE} from 'react-router-redux'
import {listenToPost} from './firebase'

export default function(state = {
    name: "",
    picture: "",
    loginToken : null,
    viewingPost: null
}, action) {
    switch (action.type) {
        case UPDATE_VIEWING_POST:
            return {
                ...state,
                viewingPost: action.post
            }
        case LOGIN:
            localStorage.setItem('id_token',action.loginToken);
            return {
                ...state,
                loginToken:action.loginToken
            }
        case LOGOUT:
            return {
                ...state,
                name: "",
                picture: "",
                loginToken:null
            }
        case LOAD_PROFILE:
          return {
              ...state,
              name:action.profile.name,
              picture:action.profile.picture
          }
        default:
            return state
    }
}
