import React from 'react'
import { addFavourites, removeFavourites } from '../actions'

class MovieCard extends React.Component
{
    handleFavouritesClick=()=>{
        const{movie}=this.props
        this.props.dispatch(addFavourites(movie))    //todo get the dispatch method from app.js ,our store is in index from thewre to app.js
    }

    handleUnFavouritesClick=()=>{
        const{movie}=this.props
        this.props.dispatch(removeFavourites(movie))    //from here they are send to actions
    }
    render()
    {
        const {movie ,isFavourite}=this.props;
        return(
            <div className="movie-card">
                <div className='left'>
                    <img alt='movie_poster' src={movie.Poster}/>
                </div>
                <div className='right'>
                    <div className="title">{movie.Title}</div>
                    <div className="plot">{movie.Plot}</div>
                    <div className="footer">
                        <div className='rating'>
                            {movie.imdbRating}
                        </div>
                        { 
                          isFavourite?
                             <button className='unfavourite-btn' onClick={this.handleUnFavouritesClick}>UnFavourite</button>
                            : <button className='favourite-btn' onClick={this.handleFavouritesClick}>Favourite</button>
                        }
                      
                     </div>
                </div>
            </div>

        )
    }
}
export default MovieCard;