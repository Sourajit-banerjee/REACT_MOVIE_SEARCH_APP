import { ADD_MOVIES,ADD_FAVOURITES ,REMOVE_FROM_FAVOURITES} from "../actions";

const intialMoviesState={
    list:[],
    favourites:[]
}
export default function movies(state=intialMoviesState,action){  //* state changed from from state=[] to the present one for adding favourites
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
        const filteredArray = state.favourites.filter((movie) => {
          return movie.Title !== action.movie.Title;
        })
        return {
          ...state,
          favourites:filteredArray //NEW ARRAY WITHOUT THE MOVIE WHICH WAS PASSED TO ACTIONS CREATOR
        };
      default:
        return state;
    }
}