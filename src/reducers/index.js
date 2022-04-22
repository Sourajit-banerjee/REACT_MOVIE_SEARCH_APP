import { ADD_MOVIES,ADD_FAVOURITES ,REMOVE_FROM_FAVOURITES,SET_SHOW_FAVOURITES} from "../actions";

const intialMoviesState={
    list:[],
    favourites:[],
    showFavourites:false
}
export function movies(state=intialMoviesState,action){  //* state changed from from state=[] to the present one for adding favourites
     //* if somehow state becomes undefined in thatr case we want to set it as arry since we will get array of movies

    //?reducers always return a new state,it cannot modify the state directly(see the cycle)
    // if(action.type===ADD_MOVIES)
    // {
    //     return {
    //         ...state,
    //         list:action.movies
    //     }
    // }
    // return state; //*our reducer has to return something ,either new state if the if else matches or the
    //                 //*old state

    switch (action.type) {
      case ADD_MOVIES:
        return {
          ...state,
          list: action.movies,
        };
      case ADD_FAVOURITES:
        return {
          ...state,
          favourites: [...state.favourites, action.movie],
        };
      case REMOVE_FROM_FAVOURITES:
        const filteredArray = state.favourites.filter((movie) => 
        movie.Title !== action.movie.Title
        )
        return {
          ...state,
          favourites:filteredArray //NEW ARRAY WITHOUT THE MOVIE WHICH WAS PASSED TO ACTIONS CREATOR
        };
        case SET_SHOW_FAVOURITES:
          return{
            ...state,
            showFavourites:action.val
          }
      default:
        return state;
    }
}


//todo: Reduceer fopr seaerch

const initialSearchState={
  result:{}
}

export function search(state=initialSearchState,action){
  return state;
}

const intialRootState={
  movies:intialMoviesState,
  search:initialSearchState
}
export  function rootReducer(state=intialRootState,action){
  return{
    movies:movies(state,action),
    search:search(state,action)
  }
}