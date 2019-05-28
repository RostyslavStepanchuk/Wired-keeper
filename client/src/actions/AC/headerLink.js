import {FOLLOW_LINK, GO_TO_INDEX} from "../index";

export const followLink = (link, currentRoot)=> {
    return dispatch => {
        if (link !== currentRoot) return dispatch({
            type: FOLLOW_LINK,
            payload: link
        });
        else return dispatch({
            type: GO_TO_INDEX
        })
    }
};

export const goToIndex = () => dispatch => {
    return dispatch({
        type: GO_TO_INDEX
    })};