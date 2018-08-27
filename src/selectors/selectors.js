import {orderBy, drop} from "lodash";

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


export function getPaginationData(paginatedCourses){
    return {
        page: paginatedCourses.page,
        pageSize: paginatedCourses.pageSize
    };
}


export function getPaginatedItems(items, page,pageSize){
    const pg = page || 1,
    pgSize = pageSize || 100,
    offset = (pg - 1) * pgSize,
    pagedItems = drop(items, offset).slice(0, pgSize);
  return {
    page: pg,
    pageSize: pgSize,
    /*total: items.length,*/
    totalPages: Math.ceil(items.length / pgSize),
    data: pagedItems
  };

}