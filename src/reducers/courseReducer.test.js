import expect from "expect";
import * as courseActions from "../actions/courseActions";
import courseReducer from "./courseReducer";


describe("Course Reducer", () => {
    it("Should add course when passed CREATE_COURSE_SUCCESS", () => {
        const initialState = [
            { title: "A" },
            { title: "B" }
        ];


        const newCourse = { title: "C" };

        const action = courseActions.createCourseSuccess(newCourse);


        const newState = courseReducer(initialState, action);

        expect(newState.length).toEqual(3);

        expect(newState[0].title).toEqual("A");
        expect(newState[1].title).toEqual("B");
        expect(newState[2].title).toEqual("C");
    });




    it("Should update course when passed UPDATE_COURSE_SUCCESS", () => {
        const initialState = [
            { id: "A", title: "A" },
            { id: "B", title: "B" },
            { id: "C", title: "C" }
        ];


        const course = { id: "B", title: "Updated Title" };

        const action = courseActions.updateCourseSuccess(course);


        const newState = courseReducer(initialState, action);

        expect(newState.length).toEqual(3);

        expect(newState[0].title).toEqual("A");
        expect(newState[2].title).toEqual("Updated Title");
        expect(newState[1].title).toEqual("C");
    });
});