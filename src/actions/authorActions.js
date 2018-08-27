import * as types from "./actionTypes";
import authorApi from "../api/mockAuthorApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";



export function loadAuthorsSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors
    };
}

export function createAuthorSuccess(author){
    return {
        type: types.CREATE_AUTHOR_SUCCESS,
        author:author
    };
}


export function updateAuthorSuccess(author){
    return {
        type: types.UPDATE_AUTHOR_SUCCESS,
        author:author
    };
}

export function saveAuthor(author) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return authorApi.saveAuthor(author)
            .then(savedAuthor => {
                if(author.id)
                    dispatch(updateAuthorSuccess(savedAuthor));
                else
                    dispatch(createAuthorSuccess(savedAuthor));
            })
            .catch(err => {
                dispatch(ajaxCallError());
                throw err;
            });
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