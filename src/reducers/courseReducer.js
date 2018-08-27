import * as types from "../actions/actionTypes";
import { bindActionCreators } from "../../node_modules/redux";
import initialState from "./initialState";

export default function courseReducer(state = initialState.paginatedCourses, action) {
    console.log("Course Reducer",state);
    switch (action.type) {
        // case types.CREATE_COURSE_SUCCESS:
        //     return [...state,
        //         Object.assign({}, action.course)
        //     ];

        // case types.UPDATE_COURSE_SUCCESS:
        //     return [
        //         ...state.filter(course => course.id != action.course.id),
        //         Object.assign({}, action.course)
        //     ];

        case types.LOAD_PAGINATED_COURSES_SUCCESS:
            return {
                courses: action.paginatedCourses.courses,
                totalPages: action.paginatedCourses.totalPages,
                page: action.paginatedCourses.page,
                pageSize: action.paginatedCourses.pageSize
            };


        default:
            return state;
    }
}