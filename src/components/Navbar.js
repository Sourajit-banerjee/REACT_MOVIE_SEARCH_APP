import React from 'react'
import { StoreContext } from '..'
import {addMoviesToList,handleMovieSearch} from '../actions'
import { data } from '../data'
// import { connect } from '../index'
import { connect } from 'react-redux'
class Navbar extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            // showSearchResults:false, moving it to the store,in sesrtch state
            searchText:''
        }
    }

    handleAddToMovies=(movie)=>{
        this.props.dispatch(addMoviesToList(movie));
        this.setState({
            showSearchResults:false
        })
    }
    handleSearch=()=>{
        const{searchText}=this.state

        this.props.dispatch(handleMovieSearch(searchText)); //*we could have fetched the data through api call over here but we shouldnt,to keeep ui and datat fetching logic seperate
    }
    handleChange=(e)=>{
        this.setState({
            searchText:e.target.value
        });
    }

    render()
    {
        // const{showSearchResults}=this.state
        const{result:movie,showSearchResults}=this.props.search  //*renaming result as movie
        return(
           
            <div className="nav">
                <div className='search-container'>
                 <input onChange={this.handleChange}/> {/* oncChange gives us the typed input */}
                <button id="search-btn" onClick={this.handleSearch}>Search</button>

                { showSearchResults && 
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span> {movie.Title} </span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          }
                </div>
            </div>

        )
    }
}


// class NavbarWrapper extends React.Component{ //*similarly like App.js

//     render(){
//         return(
//         <StoreContext.Consumer>
//            {(store)=><Navbar dispatch={store.dispatch}  search={this.props.search}/>} 
//         </StoreContext.Consumer>
//         )
//     }
// }

function mapStateToProps({search}) //* we could also done (state) line app.js but we destructure the state
{
    return{
        search //same as sesrch:search
    }
}
export default connect(mapStateToProps)(Navbar);