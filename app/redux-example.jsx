var redux = require('redux');

console.log("Redux Working");


var reducer = (state, action) =>{
    //Default state
    state = state || {name: 'Anonymous'};

    //Just prints the action
    // console.log('New Action', action);

    switch(action.type) {
        case 'CHANGE_NAME' :
            return{
                ...state,
                name: action.name
            };

        default:
            return state;
    }

};


var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

//Subscribe to changes
//Call everytime the state changes
var unsubscribe = store.subscribe(()=>{
    var state = store.getState();
    console.log("Name is" , state.name );
    document.getElementById('app').innerHTML = state.name;
});
//unsubscribe();


//Get state method returns our object i.e.
//returns out obj with name = anonymous
var currentState = store.getState();

console.log('currentSate',currentState);

//Action is responsible for changing state
store.dispatch ( {
  //Action NAme is type
    type : 'CHANGE_NAME',
    name : 'Andrew'
});



store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Emily'
})
















































// //Pure Function
// function add(a,b) {
//     return a+b;
// }
//
// //Non Pure func
// var a=3;
//
// function add(b) {
//     return a+b;
// }
//
// var result ;
// function add(a,b) {
//     result = a+b;
// return result;
// }
//
//
// function add(a,b) {
//     return a+b+new Date().getSeconds();
//
// }
//
// function changeProp(obj) {
//
//     return{
//         ...obj,
//         name : 'Jen'
//     }
//     // obj.name = 'Jen';
//     // return obj;
// }
//
// var startingVAlue = {
//     name:'karan',
//     age :25
// };
// var res = changeProp(startingVAlue);
// console.log(startingVAlue);
// console.log(res);