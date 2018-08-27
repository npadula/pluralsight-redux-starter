import React, {PropTypes} from "react";

const PaginationControls = ({onPrevPage, onNextPage, currentPage, totalPages}) =>{
    return (
        <nav>
            <a href="#" onClick={onPrevPage}>{"<<"}</a>
            <a href="#" onClick={onNextPage}>{">>"}</a>
            {`${currentPage}/${totalPages}`}

        </nav>
    );
};

PaginationControls.propTypes = {
    onPrevPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default PaginationControls;