import React from 'react';

export const TestReport = ({
    children, 
    type, 
}) => {



    return (
        <div className='main-container'>
            <div className="headers-container">
                <h1> Available questions for </h1>
                <h1 className="type"> {type} </h1>
            </div>
            <div className="filter-container">
                <label> Filter by tags or content: </label>
                <textblock id='filter-content'/>
                <label id='filter-state'></label>
                <label id='amount-filtered'></label>
            </div>

        </div>
    )
};