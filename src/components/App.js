import React from 'react'
import {data} from '../data' //*we dont want ot directly get dtyata from the file instead we get it from store which passed to the app
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import { addMovies } from '../actions'
class App extends React.Component {

  componentDidMount()
  {
    //*make api cvalls over here
    //*since we want the movies to be added to the state so over we dispatch() an action

    
    const{ store}=this.props;

//todo: the subscribes call back is called only after dispatch() and den its printing the console(store,getState())
store.subscribe(()=>{
  console.log("updated")
  this.forceUpdate() //?shouildn't be used just here used
})

    // store.dispatch({
    //   type:'ADD_MOVIES',
    //   movies:data
    // })

    //* better wat ofd wrting it
    store.dispatch(addMovies(data)) //*now add movies has the object

    console.log("after Component did m",store.getState()) //!prints the updated state but ui not reflected 
    //!Doing just this will not change the ui since we are updating the state bbut we are not doing anything on state schange
    //!we have to subscribe to state changes
  }


 //todo isFav function to show unfav option

 handleUnFavourite=(movie)=>{
  const {favourites}=this.props.store.getState();
  const index=favourites.indexOf(movie);
  if(index!==-1)
  {
    return true
  }
  return false
 }



render(){
  console.log("RENDER",this.props.store.getState())

  const {list}=this.props.store.getState() //since how state is {list:[],fav:[]}
  return (
    <div className="App">
     <Navbar/>
     <div className="main">
       <div className="tabs">
          <div className="tab">Movies</div>
          <div className="tab">Favourites</div>
       </div>
 
     <div className="list">
      {list.map((movie,index)=>(  //*index args gives the index of movie in the array
      <MovieCard 
      movie={movie} 
      key={`movies-${index}`} 
      dispatch={this.props.store.dispatch}
      isFavourite={this.handleUnFavourite(movie)} 
      /> //sending the doispatch method 
      ))}
     </div>
    </div>
  </div>
  );
  }
}

export default App;
