import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseForm from "./CourseForm";
import toastr from "toastr";

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };


        this.updateCourseState = (event) => {
            const field = event.target.name;
            let course = this.state.course;
            course[field] = event.target.value;
            return this.setState({ course: course });
        };


        this.saveCourse = (event) => {
            event.preventDefault();
            this.setState({ saving: true });

            this.props.actions
                .saveCourse(this.state.course)
                .then(() => {
                    this.context.router.push("/courses");
                    this.setState({ saving: false });
                    toastr.success("Course Saved!");
                })
                .catch(err => {
                    toastr.error(err);
                    this.setState({ saving: false });

                });

        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.course.id != newProps.course.id) {
            this.setState({ course: Object.assign({}, newProps.course) });
        }
    }


    render() {
        return (

            <CourseForm course = { this.state.course }
            errors = { this.state.errors }
            allAuthors = { this.props.authors }
            onChange = { this.updateCourseState }
            onSave = { this.saveCourse }
            saving={this.state.saving}
            />

        );
    }
}


ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    errors: PropTypes.object,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}


function getCourseById(courses, courseId) {
    const course = courses
        .filter(c => { return c.id == courseId; });

    return course ? course[0] : null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;


    let course = {
        id: "",
        watchHref: "",
        title: "",
        authorId: "",
        length: "",
        category: ""
    };


    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    const authorOptions = state.authors.map(a => {
        return {
            value: a.id,
            text: a.firstName + a.lastName
        };
    });

    return {
        course: course,
        authors: authorOptions
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);