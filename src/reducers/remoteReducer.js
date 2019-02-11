import { ADD_REMOTE_POSTS } from "../constants/action-types";

function remoteReducer(state = [], action) {

    let newState = [...state];

    switch (action.type) {
        case ADD_REMOTE_POSTS:
            newState.push(...action.payload);
            return newState;
        default:
            return newState;
    }
};

export default remoteReducer;
