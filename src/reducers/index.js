import { combineReducers } from "redux";
import { ADD_MOVIES,ADD_FAVOURITES ,REMOVE_FROM_FAVOURITES,SET_SHOW_FAVOURITES, ADD_SEARCH_RESULT, ADD_MOVIE_TO_LIST} from "../actions";

const intialMoviesState={
    list:[],
    favourites:[],
    showFavourites:false
}
export function movies(state=intialMoviesState,action){ 
  console.log("MOOVIES REDUCER")
  //* state changed from from state=[] to the present one for adding favourites
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
          case ADD_MOVIE_TO_LIST:
            return{
              ...state,
              list:[action.movie,...state.list]
            }
      default:
        return state;
    }
}


//todo: Reduceer fopr seaerch

const initialSearchState={
  //result:{},
  result:[],
  showSearchResults:false
}

export function search(state=initialSearchState,action){
  console.log("SEARCH REDUCER")
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return{
        ...state,
        result:action.movie,
        showSearchResults:true //*when we get the movie we set it to true
      }
      case ADD_MOVIE_TO_LIST:
        return{
          ...state,
          showSearchResults:false //*to get rid of pop up after add to movies
        }
    default:
      return state;
  }
}

const intialRootState={
  movies:intialMoviesState,
  search:initialSearchState
}
// export default function rootReducer(state=intialRootState,action){ //*before updating my root reducer calls movoies aand
//   //*search reducer as whenever we dispatch an action our reducer is ncalled as we are passing it to the create store
//   return{
//     movies:movies(state.movies,action),
//     search:search(state.search,action)
//   }
// } //!thses is our custom rootreducer,internally our combineReducer works like these only

export default combineReducers({ //*in-built redux root reducer
  movies:movies,
  search:search
})