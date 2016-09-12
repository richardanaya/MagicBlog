
import {LOGIN,LOGOUT} from "./actions"

export default function(state = {
    loginToken : null
}, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loginToken:action.loginToken
            }
        case LOGOUT:
            localStorage.removeItem('id_token');
            firebase.auth().signOut().then(function() {
              console.log("Signout Successful")
            }, function(error) {
              console.log(error);
            });
            return {
                ...state,
                loginToken:null
            }
        default:
            return state
    }
}
