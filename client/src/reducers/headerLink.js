import {FOLLOW_LINK, GO_TO_INDEX} from "../actions";

const initialValue = {openRoot: '/'};

export default (state=initialValue, action) => {
    switch (action.type) {
        case FOLLOW_LINK:
            return {...state, openRoot: action.payload};
        case GO_TO_INDEX:
            return {...state, openRoot: '/'};
        default:
            return {...state}
    }
}