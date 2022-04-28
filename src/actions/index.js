
//* these are called action types where we store the action stringhs into vars
export const ADD_MOVIES='ADD_MOVIES';
export const ADD_FAVOURITES='ADD_FAVOURITES';
export const REMOVE_FROM_FAVOURITES="REMOVE_FROM FAVOURITES"
export const SET_SHOW_FAVOURITES="SET_SHOW_FAVOURITES"
export const ADD_MOVIE_TO_LIST="ADD_MOVIE_TO_LIST"
export const ADD_SEARCH_RESULT="ADD_SEARCH_RESULT"
//*thse fucntion are called action creators
export function addMovies(movies){

    return{
        type:ADD_MOVIES,
        movies:movies
    }
}

export function addFavourites(movie){

    return{
        type:ADD_FAVOURITES,
        movie:movie
    }
}

export function removeFavourites(movie) //movie is sent from moviecard
{
    return{
        type:REMOVE_FROM_FAVOURITES,
        movie:movie
    }
}

export function setShowFavourites(val){

    return{
        type:SET_SHOW_FAVOURITES,
        val:val
    }
}

export function addMoviesToList(movie){
    return{
        type:ADD_MOVIE_TO_LIST,
        movie:movie
    }
}

export function handleMovieSearch(movie) //*these movie parametre has the text from inpit of the nav 
{ const url=`https://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`;

    return function(dispatch){
        fetch(url)
        .then((response)=> response.json()) //*our code will break,because outr action creatores are generally synchronous call
        .then( movie=>
            { console.log("movie",movie);
              dispatch(addMovieSearchResult(movie));//*dispatch action to save the seassrch results in store
              //*calls return an object btw ftech is an asynchronous call
                                        

       
    })
    .catch((err)=>  console.log(err))
      
    
}
}


export function addMovieSearchResult(movie){
    return{
        type:ADD_SEARCH_RESULT,
        movie:movie
    };

}