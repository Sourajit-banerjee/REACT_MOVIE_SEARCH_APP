import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore,applyMiddleware } from 'redux';
// import movies from './reducers'
import thunk from 'redux-thunk';
import  rootReducer  from './reducers';

import { Provider } from 'react-redux'; //has alrady implememneted the connect and provider for us just use it

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


// class Provider extends React.Component{
//     render(){
//         const {store}=this.props
//         return <StoreContext.Provider value={store}> 
//         {/* //!whenerver store changes all of the consum,ers changes
//         //!it means that all the components and ist descendants using store will be re rendered when store is changed */}
//             {this.props.children}   
//             {/* to render the children of provider componet that is app */}
//         </StoreContext.Provider>
//     }
// }

//!CONNECT IMPLEMENTATION 

//const ConnectedComponent=connect(callback)(App)
// export function connect(callback) {
//   return function (Component) {
//     //*since connect return me a new component
//     class ConnectedComponent extends React.Component {
//       // todo in order for opur connected component to get refreshed automaticallty when satte changes we need it to subscribe to store
//       constructor(props) {
//         super(props);
//        this.unsubscribe= this.props.store.subscribe(() => this.forceUpdate()); //*subscriibe return me a new fucntion which we can use to unsubscribe
//       }
//       componentWillUnmount(){
//           this.unsubscribe();
//       }

//       render() {
//         // return (
//     //       <StoreContext.Consumer>
//     //         {/* //*we use Store.Context to pass the required data which was requested in callback as props(which is the store) */}
//     //         {(store) => {
//     //           const state = store.getState();
//     //           const dataToBePassedAsProps = callback(state); //todo this callback return me a object having the key value pair(we pass the state right,so we state.movies values will be mapped to movies and so on)

//     //           return (
//     //             <Component
//     //               {...dataToBePassedAsProps} //*what spread oper is doin is movies={movies} and search={search} in this way it passes the props
//     //               dispatch={store.dispatch}
//     //             />
//     //           );
//     //           //*returns the App componenet only(dont hardcode app as then it work for any compo passed in func)
//     //         }}
//     //       </StoreContext.Consumer>

// //!After wraaperr
// const {store}=this.props
//         const state = store.getState();
//               const dataToBePassedAsProps = callback(state); //todo this callback return me a object having the key value pair(we pass the state right,so we state.movies values will be mapped to movies and so on)

//               return (
//                 <Component
//                   {...dataToBePassedAsProps} //*what spread oper is doin is movies={movies} and search={search} in this way it passes the props
//                   dispatch={store.dispatch}
//                 />
//               );
//       }
//      }

    // class ConnectedComponentWrapper extends React.Component {  //* SO THAT OUR CONSTRCUTOR has acces to store for subscribing
    //   render() {
    //     return (
    //       <StoreContext.Consumer>
    //         {(store) => <ConnectedComponent store={store} />}
    //       </StoreContext.Consumer>
    //     );
    //   }
      
    // }
//     return ConnectedComponentWrapper
//   };
//}




// console.log('after state:',store.getState())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// /* <StoreContext.Provider value={store}> //?now our store object is accessable to all descendants of app component */}
                                             //?we can basically wrap any component withing the storecontext and then ist descendants will have the store or whatever obj we
<Provider store={store}>
{/* <App store={store} /> */}
<App  />
</Provider>
//</StoreContext.Provider>      //*instead of passing like these we will create a class

) //passing the store to app.js

