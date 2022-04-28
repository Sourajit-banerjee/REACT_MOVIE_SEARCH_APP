import React from 'react'
import {data} from '../data' //*we dont want ot directly get dtyata from the file instead we get it from store which passed to the app
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import { addMovies ,setShowFavourites} from '../actions'
//import { StoreContext } from '../index'
//import {connect} from '../index'

//!using react-reduc
import { connect } from 'react-redux'
class App extends React.Component {

  componentDidMount()
  {
    //*make api cvalls over here
    //*since we want the movies to be added to the state so over we dispatch() an action

    
    const{ store}=this.props;

//todo: the subscribes call back is called only after dispatch() and den its printing the console(store,getState())
// store.subscribe(()=>{
//   console.log("updated")
//   this.forceUpdate() //?shouildn't be used just here used
// })
//todo no need to subscribe anymore as APP is already subscribed

    // store.dispatch({
    //   type:'ADD_MOVIES',
    //   movies:data
    // })

    //* better wat ofd wrting it
    this.props.dispatch(addMovies(data)) //*now add movies has the object

   // console.log("after Component did m",this.prop)) //!prints the updated state but ui not reflected 
    //!Doing just this will not change the ui since we are updating the state bbut we are not doing anything on state schange
    //!we have to subscribe to state changes
  }


 //todo isFav function to show unfav option

 handleUnFavourite=(movie)=>{
  const {movies}=this.props

  const index=movies.favourites.indexOf(movie);
  if(index!==-1)
  {
    return true
  }
  return false
 }

 onChangeTab=(val)=>{
   this.props.dispatch(setShowFavourites(val))
 }

render(){

const{movies,search}=this.props

  console.log("RENDER",this.props)
  const {list,favourites,showFavourites}=movies;   //this.props.store.getState() //since how state is {list:[],fav:[]}

  const displayMovies=showFavourites?favourites:list; //*if show nfav is true den show only favourites else we display the lost of movies


  return(

     //*store is passed aas an arg to the call back internally by react,when it is called,not only store whatever
      //*we pass to the value will be passed here
  
          <div className="App">
           <Navbar  search={search}/>
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
            dispatch={this.props.dispatch}
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


// class AppWrapper extends React.Component{
// //!we created this wrappper instead of writing it inside the above apps render because,
// //!then our other function above CompoennetDidM,unfav,etc,would have not got these store value
// //!so we pass the store as prop to the App compoenent
//   render(){
//     return(
//   <StoreContext.Consumer> 
//     {/* //!we can only use Consumer inside render() function */}
//     {(store)=> <App store={store}/>}
//   </StoreContext.Consumer>
//     );
//   }
// }



//todo:Using Connect

function mapStateToProps(state){ //*these callback function will tell connect what data we want from store
  return{
   movies:state.movies,
   search:state.movies
  }
 }
 const ConnectedComponent=connect(mapStateToProps)(App) //*thse connect will retuen fucntion,how to tell connect in which component we want 
 //* all our datate-> we did it by passing the component which is App over here
 //* these connect will return me in turn a new Component
//*only the component which is connected(app over here) gets re rendered when there is a change prop,which is movies or seserch

export default  ConnectedComponent;
