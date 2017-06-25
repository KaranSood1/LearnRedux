var redux = require('redux');
var axios = require('axios');
console.log("Redux Working");



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

//Name Reducer and action generators
//----------------------------------
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

var changeName = (name) => {
  return {
      type: 'CHANGE_NAME',
      name: name
  }
};


//Hobby Reducer and action generators
//----------------------------------
var nextHobbyId =1;
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
            return state.filter((hobby)=>hobby.id !== action.id);

        default:
            return state;

    };
};

var addHobby = (hobby) => {
    return{
        type : 'ADD_HOBBY',
        hobby : hobby
    }
};

var removeHobby = (id) => {
    return {
        type:'REMOVE_HOBBY',
        id :   id
    }
};


//Movie Reducer and action generators
//----------------------------------
var nextMovieId = 1;
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
                return (
                    state.filter(function (movie) {
                        return movie.id !== action.id
                    })
            );
            default:
                return state;
        }
    };
var addMovie = (movie)=>{
    return{
        type:'ADD_MOVIE_GENRE',
        title: movie.title,
        genre: movie.genre
    }
};
var removeMovie = (id)=>{
    return{
        type:'REMOVE_MOVIE',
        id : id

    }
};

var mapReducer = (state = {isFetching : false, url : undefined}, action) => {
    switch (action.type){
        case 'START_LOCATION_FETCH':
            return{
                isFetching: true,
                url: undefined
            };
        case 'COMPLETE_LOCATION_FETCH':
            return{
            isFetching: false,
                url: action.url
            };
        default:
            return state;
    }

};
var startLocationFetch = ()=>{
  return{
      type:'START_LOCATION_FETCH'
  }
};
var completeLocationFetch = (url)=> {
    return{
        type: 'COMPLETE_LOCATION_FETCH',
        url : url
    }
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function (res){
      var loc = res.data.loc;
      var baseUrl = 'http://maps.google.com?q=';

      store.dispatch(completeLocationFetch(baseUrl + loc))
  });


};

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies : hobbiesReducer,
    movies: moviesReducer,
    map :mapReducer
});


var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

//Subscribe to changes
//Call everytime the state changes
var unsubscribe = store.subscribe(()=>{
    var state = store.getState();

    console.log('New State ', store.getState());

    if(state.map.isFetching){
        document.getElementById('app').innerHTML ='Loading';
    } else if (state.map.url){
        document.getElementById('app').innerHTML= '<a href="'+state.map.url+' target="_blank">View Location</a>'
    }
});
//unsubscribe();


//Get state method returns our object i.e.
//returns out obj with name = anonymous
var currentState = store.getState();

console.log('currentSate',currentState);

fetchLocation();
//Action is responsible for changing state
// store.dispatch ( {
//   //Action NAme is type
//     type : 'CHANGE_NAME',
//     name : 'Andrew'
// });
//We Will use action generators to replace the above code
store.dispatch(changeName('Andrew'));


// store.dispatch({
//     type : 'ADD_HOBBY',
//     hobby : 'Running'
// });
store.dispatch(addHobby('Running'));


// store.dispatch({
//     type : 'ADD_HOBBY',
//     hobby : 'Walking'
// });
store.dispatch(addHobby('Walking'));

//remove array item
// store.dispatch({
//
// });
store.dispatch(removeHobby(2));

// store.dispatch({
//     type: 'CHANGE_NAME',
//     name: 'Emily'
// });
store.dispatch(changeName('Emily'));

// store.dispatch({
//    type:'ADD_MOVIE_GENRE',
//     title: 'FAN',
//     genre: 'Fiction'
// });
store.dispatch(addMovie({title:'FAN',genre:'Fiction'}));

// store.dispatch({
//     type:'ADD_MOVIE_GENRE',
//     title: 'JHMS',
//     genre: 'Romance'
// });
store.dispatch(addMovie({title:'JHMS',genre:'Romance'}));

// store.dispatch({
//     type:'REMOVE_MOVIE',
//     id:1
// });
store.dispatch(removeMovie(1));















































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