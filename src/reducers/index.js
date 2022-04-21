export default function movies(state=[],action){  //* if somehow state becomes undefined in thatr case we want to set it as arry since we will get array of movies

    //?reducers always return a new state,it cannot modify the state directly(see the cycle)
    if(action.type==='ADD_MOVIES')
    {
        return action.movies
    }
    return state; //*our reducer has to return something ,either new state if the if else matches or the
                    //*old state
}