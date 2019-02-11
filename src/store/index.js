// The Redux store is fundamental: the state of the whole application lives inside the store.

import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middlewares";

const middlewares = [
    forbiddenWordsMiddleware,
    thunkMiddleware // lets us return functions from action creators
];

const isProduction = (process.env.NODE_ENV === "production");
let storeEnhancers = compose;

if (!isProduction) {
    /* eslint-disable no-console */
    const loggerMiddleware = store => next => action => {
        console.group(action.type);
        console.info("dispatching", action);
        const result = next(action);
        console.log("next state", store.getState());
        console.groupEnd(action.type);
        return result;
    };

    middlewares.push(loggerMiddleware);
    storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(...middlewares))
);

export default store;
