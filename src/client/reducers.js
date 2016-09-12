
import {LOGIN,LOGOUT,LOAD_PROFILE} from "./actions"

export default function(state = {
    name: "",
    picture: "",
    loginToken : null
}, action) {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('id_token',action.loginToken);
            return {
                ...state,
                loginToken:action.loginToken
            }
        case LOGOUT:
            localStorage.removeItem('id_token');
            localStorage.removeItem('delegation_token');
            localStorage.removeItem('profile');
            firebase.auth().signOut().then(function() {
              console.log("Signout Successful")
            }, function(error) {
              console.log(error);
            });
            return {
                ...state,
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
