import { ADD_ARTICLE, FOUND_BAD_WORD, ADD_REMOTE_POSTS } from "../constants/action-types";

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
};

export function foundBadWord() {
    return { type: FOUND_BAD_WORD }
};

export function addLoadedPosts(payload) {
    return { type: ADD_REMOTE_POSTS, payload }
}

export function getData() {
    return function (dispatch) {
        return fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => {
                // We need to explicitly call dispatch inside the async
                //  function for dispatching the action.
                dispatch(addLoadedPosts(json));
            });
    };
}
