export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
import {lock} from "./auth0"

export function auth0Login(){
  return (dispatch)=>{
    lock.show();
  }
}

/*export function testLogin(){
  return (dispatch)=>{
    var storedToken = localStorage.getItem('id_token');
    if(storedToken !== null){
      var options = {
        id_token : storedToken,
        target: '9RjVS1keVE6dzidUUIaeKKxwCYkeClgG',
        api : 'firebase'
      };

      auth0.getDelegationToken(options, function(err, result) {
        if(!err) {
          // Exchange the delegate token for a Firebase auth token
          firebase.auth().signInWithCustomToken(result.id_token).then(function(){
            dispatch(login(result.id_token))
          }).catch(function(error) {
            console.log(error);
          });
        }
      });
    }
  }
}



var retrieve_profile = function() {
  var id_token = localStorage.getItem('id_token');
  if (id_token) {
    lock.getProfile(id_token, function (err, profile) {
      if (err) {
        return alert('There was an error getting the profile: ' + err.message);
      }
      // Display user information
      show_profile_info(profile);
    });
  }
};

var show_profile_info = function(profile) {
  var avatar = document.getElementById('avatar');
  document.getElementById('nickname').textContent = profile.nickname;
  btn_login.style.display = "none";
  avatar.src = profile.picture;
  avatar.style.display = "block";
  btn_logout.style.display = "block";
};


*/



  /*firebase.database().ref('/').on('value', function(snapshot) {
    debugger;
  });*/

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
