import * as types from "./actionTypes";
import authorApi from "../api/mockAuthorApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

/*export function createAuthor(author) {

    return {
        type: types.CREATE_AUTHOR,
        author
    };
}*/



export function loadAuthorsSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors
    };
}




export function loadAuthors() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return authorApi.getAllAuthors()
            .then(authors => {
                dispatch(loadAuthorsSuccess(authors));
            })
            .catch(err => {
                dispatch(ajaxCallError());
                throw err;
            });
    };
}