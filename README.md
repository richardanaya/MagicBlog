# MagicBlog

Check the app out on https://mysterious-spire-72024.herokuapp.com/

#Tech Used
Auth0 for authorization
Firebase for realtime data model and business logic
Heroku for hosting
React+Redux+ReactRouter+WebPack

```bash
npm install

#starts webpack
npm run dev

#nodemon the server so it reloads when server changes
npm run server

#should be visible at http://localhost:3000
```

#Dev Notes

Decided to Break Down App into Various Containers and Components
AppContainer
Header
Footer

LandingPageContainer
PostSummarized

PostContainer
PostRead
PostEdit
Comment
CommentEntryArea

Created Rules with some basic validation on Firebase:
{
  "rules": {
    ".read": true,
    "posts":{
      "$uid":{
        "$key":{
          ".validate": "newData.hasChildren(['title','content','username','datetime'])",  
        	".write": "$uid === auth.uid",
	        "$other": {
  	        ".validate": false
    	    },
          "title": {
             ".validate": "newData.isString() && newData.val().length <200"
          },
          "content": {
            ".validate": "newData.isString() && newData.val().length <5000"
          },
          "username": {
            ".validate": "newData.isString() && newData.val().length <200"
          },
          "datetime": {
            ".validate": "newData.isNumber() && newData.val() < now"
          }
        }
      }
    },
    "comments":{
      "$uid":{
        "$key":{
          ".validate": "newData.hasChildren(['post_id','content','username','datetime'])",  
        	".write": "$uid === auth.uid",
	        "$other": {
  	        ".validate": false
    	    },
          "post_id": {
             ".validate": "newData.isString() && newData.val().length <200"
          },
          "content": {
            ".validate": "newData.isString() && newData.val().length <5000"
          },
          "username": {
            ".validate": "newData.isString() && newData.val().length <200"
          },
          "datetime": {
            ".validate": "newData.isNumber() && newData.val() < now"
          }
        }
      }
    }
  }
}
