import {orderBy} from "lodash";

//const _array = array;
export function formatAuthorsForDropdown(authors) {
    return authors.map(a => {
        return {
            value: a.id,
            text: a.firstName + a.lastName
        };
    });
}


export function coursesSorted(courses){
    return orderBy(courses, [c => c.title], ["asc"]);
}


export function authorsSorted(authors){
    return orderBy(authors, [a => a.lastName], ["asc"]);
}