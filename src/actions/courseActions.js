import * as types from "./actionTypes";
import courseApi from "../api/mockCourseApi";
import { beginAjaxCall, ajaxCallError } from "./ajaxStatusActions";

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

export function saveCourse(course) {
    return (dispatch) => {
        dispatch(beginAjaxCall());

        return courseApi.saveCourse(course)
            .then(savedCourse => {
                if(course.id)
                    dispatch(updateCourseSuccess(savedCourse));
                else
                    dispatch(createCourseSuccess(savedCourse));
            })
            .catch(err => {
                dispatch(ajaxCallError());
                throw err;
            });
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