export var auth0 = new Auth0({
  domain:       'omniscient.auth0.com',
  clientID:     '9RjVS1keVE6dzidUUIaeKKxwCYkeClgG',
  responseType: 'token'
});
export var lock = new Auth0Lock('9RjVS1keVE6dzidUUIaeKKxwCYkeClgG', 'omniscient.auth0.com');
