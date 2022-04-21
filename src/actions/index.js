
//* these are called action types where we store the action stringhs into vars
export const ADD_MOVIES='ADD_MOVIES';
export const ADD_FAVOURITES='ADD_FAVOURITES';
export const REMOVE_FROM_FAVOURITES="REMOVE_FROM FAVOURITES"
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