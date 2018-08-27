import * as types from "../actions/actionTypes";
import { bindActionCreators } from "../../node_modules/redux";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {

    switch (action.type) {
        case types.CREATE_AUTHOR_SUCCESS:
            return [...state,
                Object.assign({}, action.author)
            ];

        case types.UPDATE_AUTHOR_SUCCESS:
            return [
                ...state.filter(author => author.id != action.author.id),
                Object.assign({}, action.author)
            ];

        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;


        default:
            return state;
    }
}