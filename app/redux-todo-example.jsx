var redux = require('redux');

console.log('Starting Redux');


// var reducer = (state, action) => {
//   state = state || {searchText:"", showCompleted: false, todo: []}
//   switch (action.type){
//       case 'CHANGE_SEARCH_TEXT':
//           return{
//               ...state,
//               searchText: action.searchText
//           }
//       default:
//           return state;
//   }
// };
//
//
//
// var store = redux.createStore(reducer, redux.compose(
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// ));
//
// var currentState =store.getState();
// console.log('CS',currentState);
//
// store.dispatch({
//    type : 'CHANGE_SEARCH_TEXT',
//     searchText: 'work'
// });
//
// console.log('searchText work', store.getState());

var stateDefault = {
    searchText : '',
    showCompleted: false,
    todos: []
};

var reducer = (state,action) => {
    state = state|| stateDefault ;

    switch (action.type) {
        case "CHANGE_SEARCH_TEXT" :
            return {
                ...state,
                searchText: action.searchText
            };

        default: {
            return state;
        }
    }
}

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f

));

//Subscribe

var unsubscribe = store.subscribe(()=>{
    var state = store.getState();
    //console.log("Changed State of searchtext: ", state.searchText);
    document.getElementById('app').innerHTML = state.searchText;
});

var currentState = store.getState();

console.log('currentState', currentState);

// var action = {
//     type : "CHANGE_SEARCH_TEXT",
//     searchText: "Second Text"
// };
//store.dispatch(action);

store.dispatch({
    type : "CHANGE_SEARCH_TEXT",
    searchText: "Second Text"
});
store.dispatch({
    type : "CHANGE_SEARCH_TEXT",
    searchText: "Third Text"
});
store.dispatch({
    type : "CHANGE_SEARCH_TEXT",
    searchText: "Fourth Text"
});

console.log("Changed State of searchtext: ", store.getState());










