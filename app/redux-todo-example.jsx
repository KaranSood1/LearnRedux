var redux = require('redux');

console.log('Starting Redux');


var reducer = (state, action) => {
  state = state || {searchText:"", showCompleted: false, todo: []}
  return state;
};

var store = redux.createStore(reducer);

var currentState =store.getState();
console.log('CS',currentState);