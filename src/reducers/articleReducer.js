import { ADD_ARTICLE } from "../constants/action-types";

function articleReducer(state = [], action) {

    let newState = [...state];

    switch (action.type) {
        case ADD_ARTICLE:
            newState.push(action.payload);
            return newState;
        default:
            return newState;
    }
};

export default articleReducer;
