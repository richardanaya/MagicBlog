
import {LOGIN,LOGOUT,LOAD_PROFILE,UPDATE_VIEWING_POST} from "./actions"
import  {LOCATION_CHANGE} from 'react-router-redux'
import {listenToPost} from './firebase'

export default function(state = {
    name: "",
    picture: "",
    userID: null,
    loginToken : null
}, action) {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('id_token',action.loginToken);
            return {
                ...state,
                loginToken:action.loginToken,
                userID:action.userID
            };
        case LOGOUT:
            localStorage.removeItem('userID');
            localStorage.removeItem('id_token');
            localStorage.removeItem('delegation_token');
            localStorage.removeItem('profile');
            return {
                ...state,
                name: "",
                picture: "",
                loginToken:null,
                userID:null
            };
        case LOAD_PROFILE:
          return {
              ...state,
              name:action.profile.name,
              picture:action.profile.picture
          };
        default:
            return state
    }
}
