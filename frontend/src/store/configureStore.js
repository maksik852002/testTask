import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import usersReducer from "./reducers/usersReducer";
import mainReducer from "./reducers/mainReducer";
import articlesReducer from "./reducers/articlesReducer";
import categoriesReducer from "./reducers/categoriesReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  main: mainReducer,
  users: usersReducer,
  art: articlesReducer,
  cat: categoriesReducer
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

export default store;







