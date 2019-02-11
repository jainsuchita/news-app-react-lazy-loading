import { ADD_ARTICLE } from "../constants/action-types";
import { foundBadWord } from "../actions/index"

const forbiddenWords = ["spam", "money"];

// We need to check the action payload, namely the title property.
// If the title matches one or more bad words we stop the user from adding the article.

export function forbiddenWordsMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            // do your stuff
            if (action.type === ADD_ARTICLE) {

                const foundWord = forbiddenWords.filter(word =>
                    action.payload.title.includes(word)
                );
                if (foundWord.length) {
                    return dispatch(foundBadWord());
                }
            }
            return next(action);
        };
    };
}
