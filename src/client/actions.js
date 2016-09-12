export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOAD_PROFILE = "LOAD_PROFILE";
import {lock} from "./auth0"

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
