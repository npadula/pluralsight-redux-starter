import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as authorActions from "../../actions/authorActions";
import {bindActionCreators} from "redux";
import AuthorList from "./AuthorList";
import {browserHistory} from "react-router";
import { authorsSorted } from "../../selectors/selectors";

export class AuthorPage extends React.Component{
    constructor(props,context){
        super(props,context);


        this.redirectToAddAuthor = () => {
            browserHistory.push("/author");
        };

    }

 

   



 


    render(){
        const authors = authorsSorted(this.props.authors);

        return (
            <div>
                <h1>Authors</h1>
                <input
                    type="submit"
                    value="Add Author"
                    className="btn btn-primary"
                    onClick={this.redirectToAddAuthor}
                />
               <AuthorList authors={authors}/>

            </div>
        );
    }
}

function mapStateToProps(state,ownProps){
    
    return {
        authors: state.authors
    };
}


function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(authorActions,dispatch)
    };
}

AuthorPage.propTypes = {
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};



export default connect(mapStateToProps,mapDispatchToProps)(AuthorPage);