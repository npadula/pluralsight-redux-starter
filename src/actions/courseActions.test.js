import expect from "expect";
import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import thunk from "redux-thunk";
import nock from "nock"; //Mock http api for testing thunks
import configureMockStore from "redux-mock-store";


/*
Unit testing action creators is typically just comparing objects
Worth it?
*/




describe("Course Actions", () => {
    describe("Create course Success", () => {
        it("Should Create a CREATE_COURSE_SUCCESS action", () => {

            const course = {
                id: "react-flux-building-applications",
                title: "Building Applications in React and Flux",
                watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
                authorId: "cory-house",
                length: "5:08",
                category: "JavaScript"
            };




            const expected = {
                type: types.CREATE_COURSE_SUCCESS,
                course: course
            };


            const test = courseActions.createCourseSuccess(course);

            expect(test).toEqual(expected);
        });
    });
});


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Async actions", () => {
    afterEach(() => {
        nock.cleanAll();
    });



    it("Should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses", (done) => {
        // nock("http://example.com")
        //     .get("/courses")
        //     .reply(200, {body: {course: [{id:1, firstName:"Cory", lastName:"House"}]}});


        const expectedActions = [
            { type: types.BEGIN_AJAX_CALL },
            {
                type: types.LOAD_COURSES_SUCCESS,
                body: {
                    courses: [
                        { id: "clean-code", title: "Clean Code" }
                    ]
                }
            }
        ];

        const initialState = { courses: [] };
        const store = mockStore(initialState, expectedActions);


        store.dispatch(courseActions.loadCourses()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);

            done();


        });

    });
});