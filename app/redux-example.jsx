var redux = require('redux');

console.log("Redux Working");

var stateDefault = {
    name: 'Anonymous',
    hobbies: [],
    movies:[]
};
var nextHobbyId =1;
var nextMovieId = 1;
var oldreducer = (state, action) =>{
    //Default state
    state = state || stateDefault;

    //Just prints the action
    // console.log('New Action', action);

    switch(action.type) {
        case 'CHANGE_NAME' :
            return{
                ...state,
                name: action.name
            };
        case 'ADD_HOBBY' :
            return {
                //All the names
                ...state,
                hobbies: [
                    //all the hobbies
                    ...state.hobbies,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
            ]
            };
        case 'ADD_MOVIE_GENRE' :
            return{
                ...state,
                movies: [
                    ...state.movies,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre

                    }
                ]
            };
        case 'REMOVE_HOBBY' :
            return {
                ...state,
                hobbies: state.hobbies.filter(function (hobby) {
                    return hobby.id !== action.id
                })
            };
        case 'REMOVE_MOVIE' :
            return {
                ...state,
                movies : state.movies.filter(function (movie) {
                    return movie.id !==action.id
                })
            };
        default:
            return state;
    }

};

var nameReducer = (state='Anonymous', action) =>{
    switch (action.type){
        case 'CHANGE_NAME' :
            return{
                name: action.name
            };
        default:
            return state;
    }
};

var hobbiesReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_HOBBY' :


            return [
                //all the hobbies
                ...state,
                {
                    id: nextHobbyId++,
                    hobby: action.hobby
                }
            ];
        case 'REMOVE_HOBBY' :
            return {
                ...state,
                hobbies: state.filter(function (hobby) {
                    return hobby.id !== action.id
                })
            };

        default:
            return state;

    }
    ;
}
    var moviesReducer = (state=[],action) => {
        switch (action.type) {
            case 'ADD_MOVIE_GENRE' :
                return[
                    ...state,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre

                    }
                ];
            case 'REMOVE_MOVIE' :
                return {
                    ...state,
                    movies: state.filter(function (movie) {
                        return movie.id !== action.id
                    })
                };
            default:
                return state;
        }
    };
var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies : hobbiesReducer,
    movies: moviesReducer
});


var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

//Subscribe to changes
//Call everytime the state changes
var unsubscribe = store.subscribe(()=>{
    var state = store.getState();
    console.log("Name is" , state.name );
    document.getElementById('app').innerHTML = state.name;
    console.log('New State ', store.getState());
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
    type : 'ADD_HOBBY',
    hobby : 'Running'
});

store.dispatch({
    type : 'ADD_HOBBY',
    hobby : 'Walking'
});

//remove array item
store.dispatch({
   type:'REMOVE_HOBBY',
    id:2
});


store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Emily'
});

store.dispatch({
   type:'ADD_MOVIE_GENRE',
    title: 'FAN',
    genre: 'Fiction'
});

store.dispatch({
    type:'ADD_MOVIE_GENRE',
    title: 'JHMS',
    genre: 'Romance'
});

store.dispatch({
    type:'REMOVE_MOVIE',
    id:1
});
















































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