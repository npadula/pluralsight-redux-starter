import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as courseActions from "../../actions/courseActions";
import {bindActionCreators} from "redux";
import CourseList from "./CourseList";
import {browserHistory} from "react-router";
import {coursesSorted} from "../../selectors/selectors";
import PaginationControls from "../common/PaginationControls";

class CoursePage extends React.Component{
    constructor(props,context){
        super(props,context);


        this.redirectToAddCourse = () => {
            browserHistory.push("/course");
        };


        this.prevPage = (event) => {
            this.props.actions.prevPage(this.props.page, this.props.pageSize);
        };
        this.nextPage = (event) => {
            this.props.actions.nextPage(this.props.page, this.props.pageSize);
        };



    }

 

   



 


    render(){
        const {courses, totalPages, page, pageSize} = this.props;
        const sortedCourses = coursesSorted(courses);

        return (
            <div>
                <h1>Courses</h1>
                <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCourse}
                />
               <CourseList courses={sortedCourses}/>
               <PaginationControls
                onNextPage={this.nextPage}
                onPrevPage={this.prevPage}
                currentPage={this.props.page}
                totalPages={this.props.totalPages}
               />

            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
    console.log("CoursePage mapStateToProps", state);
    return {
        courses: state.paginatedCourses.courses,
        page: state.paginatedCourses.page,
        pageSize: state.paginatedCourses.pageSize,
        totalPages: state.paginatedCourses.totalPages

    };
}


function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions,dispatch)
    };
}

CoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
};



export default connect(mapStateToProps,mapDispatchToProps)(CoursePage);