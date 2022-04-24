import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore,applyMiddleware } from 'redux';
// import movies from './reducers'
import thunk from 'redux-thunk';
import  rootReducer  from './reducers';


//todo:moiddle ware for logging

//*fucntion(obj,next,action)  curried form thesde function written below
//*logger(object having propertiues dispatch and getState is passed)(next)(action)
// const logger=function({dispatch,getState}){   //*function has 2 properties disptach() and getState()
//     return function(next){
//         return function(action){
//             //*middleware code
//             console.log('ACTION_TYPE=',action.type);
//             next(action);//* if we dont use necxt our app will get stuck and will not go to next middleware ort dispatchj function
//         }
//     }
// }


const logger=({dispatch,getState})=>(next)=>(action)=>{
    if(typeof action!=='function')
        console.log('ACTION_TYPE=',action.type)
    next(action)
}

//todo: to handle the case of api call,actions generally return an object not a function which weare return nbuing,
//todo so we build our oqwn custom middleware (see handleMovieSearch())

// const thunk=({dispatch,getState})=>(next)=>(action)=>{
    
//     if(typeof action==='function'){
//         action(dispatch)
//         return;
//     }
//     next(action)
   
// }//!was our custom thunk to deal with async api call and fucntion returnning in action creators(its already there in redux-thunk pkg)


const store=createStore(rootReducer,applyMiddleware(logger,thunk)); //*passing a root reducer instead of movies,since we can pass only one reducer
//*to create store so ,we create root reducer having search and movies as objs inside objs
console.log('store:',store)
//console.log('before state:',store.getState()) //todo:this prints an empty array-got from the reducdeer
//*since we pass the movies to createStore() it internally calls the reducer to get the initial state and over there state is undefined

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:' Superman '}]
// });

//!REACT CONTEXT

export const StoreContext=createContext();
console.log("StoreContext",StoreContext)


class Provider extends React.Component{
    render(){
        const {store}=this.props
        return <StoreContext.Provider value={store}>
            {this.props.children}   
            {/* to render the children of provider componet that is app */}
        </StoreContext.Provider>
    }
}


// console.log('after state:',store.getState())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/* <StoreContext.Provider value={store}> //?now our store object is accessable to all descendants of app component */}
                                            //?we can basically wrap any component withing the storecontext and then ist descendants will have the store or whatever obj we
<Provider store={store}>
{/* <App store={store} /> */}
<App  />
</Provider>


// </StoreContext.Provider> //*instead of passing like these we will create a class

) //passing the store to app.js

