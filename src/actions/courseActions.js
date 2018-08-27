import * as types from "./actionTypes";
import courseApi from "../api/mockCourseApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";
import {getPaginationData} from "../selectors/selectors";


export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses
    };
}


export function nextPage(page,pageSize){
    return function(dispatch){
        const newPage = page+1;

        dispatch(loadCoursesPaginated(newPage,pageSize));
    }
}


export function prevPage(page,pageSize){
    return function(dispatch){
        const newPage = page-1;

        dispatch(loadCoursesPaginated(newPage,pageSize));
    }
}


export function loadPaginatedCoursesSuccess(paginatedCourses){
    return {
        type: types.LOAD_PAGINATED_COURSES_SUCCESS,
        paginatedCourses: paginatedCourses
    };
}

export function saveCourse(course) {
    return (dispatch) => {
        dispatch(beginAjaxCall());

        return courseApi.saveCourse(course)
            .then(savedCourse => {
                if(course.id)
                    dispatch(updateCourseSuccess(savedCourse));
                else
                    dispatch(createCourseSuccess(savedCourse));

                dispatch(refreshAfterSave());
            })
            .catch(err => {
                dispatch(ajaxCallError());
                throw err;
            });
    };
}


export function refreshAfterSave(){
    return function(dispatch, getState){
        const {page, pageSize} = getPaginationData(getState().paginatedCourses);

        dispatch(loadCoursesPaginated(page,pageSize));


    };
}




export function loadCourses() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch(err => {
                dispatch(ajaxCallError());
                throw err;
            });
    };
}


export function loadCoursesPaginated(page = 1,pageSize = 1){
    return function(dispatch){
        dispatch(beginAjaxCall());

        return courseApi.getCoursesPaginated(page,pageSize)
            .then(paginatedCourses => {
                dispatch(loadPaginatedCoursesSuccess(paginatedCourses));
            })
            .catch(err => {
                dispatch(ajaxCallError());
                throw err;
            });
    };
}