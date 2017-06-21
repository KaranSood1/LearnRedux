var redux = require('redux');

console.log("Redux Working");


var reducer = (state, action) =>{
    //Default state
    state = state || {name: 'Anonymous'};
    return state;
};


var store = redux.createStore(reducer);

//Get state method returns our object i.e.
//returns out obj with name = anonymous
var currentState = store.getState();

console.log('currentSate',currentState);





















































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