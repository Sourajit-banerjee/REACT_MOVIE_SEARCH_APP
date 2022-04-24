import React from 'react'
import {data} from '../data' //*we dont want ot directly get dtyata from the file instead we get it from store which passed to the app
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import { addMovies ,setShowFavourites} from '../actions'
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
  const {movies}=this.props.store.getState();

  const index=movies.favourites.indexOf(movie);
  if(index!==-1)
  {
    return true
  }
  return false
 }

 onChangeTab=(val)=>{
   this.props.store.dispatch(setShowFavourites(val))
 }

render(){
const{movies,search}=this.props.store.getState()

  console.log("RENDER",this.props.store.getState())
  const {list,favourites,showFavourites}=movies;   //this.props.store.getState() //since how state is {list:[],fav:[]}

  const displayMovies=showFavourites?favourites:list; //*if show nfav is true den show only favourites else we display the lost of movies

  return (
    <div className="App">
     <Navbar dispatch={this.props.store.dispatch} search={search}/>
     <div className="main">
       <div className="tabs">
          <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
       </div>
 
     <div className="list">
      {displayMovies.map((movie,index)=>(  //*index args gives the index of movie in the array
      <MovieCard 
      movie={movie} 
      key={`movies-${index}`} 
      dispatch={this.props.store.dispatch}
      isFavourite={this.handleUnFavourite(movie)} 
      /> //sending the doispatch method 
      ))}
     </div>
    </div>
    <div>{displayMovies.length===0?<div className='no-movies'>No movies to display!</div>:null}</div>
  </div>
  );
  }
}

export default App;
