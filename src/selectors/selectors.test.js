import expect from "expect";
import { formatAuthorsForDropdown } from "./selectors";
/*
Testing mapStateToProps implies mostly extracting logic to separate functions
and testing those individual functions.

Functions that are expensive to run can be memoized using Reselect
*/

describe("Authors Selectors", () => {
    describe("Authors options for dropdown", () => {
        it("Should return authors formatted as options", () => {
            const authors = [{
                    id: 'cory-house',
                    firstName: 'Cory',
                    lastName: 'House'
                },
                {
                    id: 'scott-allen',
                    firstName: 'Scott',
                    lastName: 'Allen'
                }
            ];




            const expected = [
                { value: "cory-house", text: "CoryHouse" },
                { value: "scott-allen", text: "ScottAllen" }
            ];


            const test = formatAuthorsForDropdown(authors);

            expect(test).toEqual(expected);
        });
    });
});