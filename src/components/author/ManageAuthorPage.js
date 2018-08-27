import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authorActions from "../../actions/authorActions";
import AuthorForm from "./AuthorForm";
import toastr from "toastr";

export class ManageAuthorPage extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            author: Object.assign({}, this.props.author),
            errors: {},
            saving: false
        };


        this.updateAuthorState = (event) => {
            const field = event.target.name;
            let author = this.state.author;
            author[field] = event.target.value;
            return this.setState({ author: author });
        };

        this.formIsValid = () => {
            let valid = true;
            let errors = {};


            if (this.state.author.firstName.length < 5) {
                errors.title = "First Name must be at least 5 characters";
                valid = false;
            }

            
            if (this.state.author.lastName.length < 5) {
                errors.title = "Last Name must be at least 5 characters";
                valid = false;
            }


            this.setState({ errors: errors });
            return valid;



        };

        this.saveAuthor = (event) => {
            event.preventDefault();

            if (!this.formIsValid())
                return;

            this.setState({ saving: true });

            this.props.actions
                .saveAuthor(this.state.author)
                .then(() => {
                    this.context.router.push("/authors");
                    this.setState({ saving: false });
                    toastr.success("Author Saved!");
                })
                .catch(err => {
                    toastr.error(err);
                    this.setState({ saving: false });

                });

        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.author.id != newProps.author.id) {
            this.setState({ author: Object.assign({}, newProps.author) });
        }
    }


    render() {
        return (

            <AuthorForm author = { this.state.author }
                errors = { this.state.errors }
                onChange = { this.updateAuthorState }
                onSave = { this.saveAuthor }
                saving = { this.state.saving }
            />

        );
    }
}


ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    errors: PropTypes.object,
    actions: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}


function getAuthorById(authors, authorId) {
    const author = authors
        .filter(a => { return a.id == authorId; });

    return author ? author[0] : null;
}

function mapStateToProps(state, ownProps) {
    const authorId = ownProps.params.id;


    let author = {
        id: "",
        firstName:"",
        lastName: ""
    };


    if (authorId && state.courses.length > 0) {
        author = getAuthorById(state.authors, authorId);
    }




    return {
        author: author
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);