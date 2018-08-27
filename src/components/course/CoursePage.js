import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as courseActions from "../../actions/courseActions";
import {bindActionCreators} from "redux";
import CourseList from "./CourseList";
import {browserHistory} from "react-router";
import {coursesSorted} from "../../selectors/selectors";

class CoursePage extends React.Component{
    constructor(props,context){
        super(props,context);


        this.redirectToAddCourse = () => {
            browserHistory.push("/course");
        };

    }

 

   



 


    render(){
        const courses = coursesSorted(this.props.courses);

        return (
            <div>
                <h1>Courses</h1>
                <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCourse}
                />
               <CourseList courses={courses}/>

            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
    debugger
    return {
        courses: state.courses
    };
}


function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions,dispatch)
    };
}

CoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};



export default connect(mapStateToProps,mapDispatchToProps)(CoursePage);