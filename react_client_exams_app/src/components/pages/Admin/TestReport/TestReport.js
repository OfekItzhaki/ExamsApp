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
            <div className="table-container">
                <table>
                    <tr>
                        <th> ID </th>
                        <th> Question Text and Tags </th>
                        <th> Last Update </th>
                        <th> Question Type </th>
                        <th> # of Tests </th>
                    </tr>
                </table>
            </div>

        </div>
    )
};