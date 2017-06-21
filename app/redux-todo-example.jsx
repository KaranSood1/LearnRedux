var redux = require('redux');

console.log('Starting Redux');


var reducer = (state, action) => {
  state = state || {searchText:"", showCompleted: false, todo: []}
  switch (action.type){
      case 'CHANGE_SEARCH_TEXT':
          return{
              ...state,
              searchText: action.searchText
          }
      default:
          return state;
  }
};

var store = redux.createStore(reducer);

var currentState =store.getState();
console.log('CS',currentState);

store.dispatch({
   type : 'CHANGE_SEARCH_TEXT',
    searchText: 'work'
});

console.log('searchText work', store.getState());