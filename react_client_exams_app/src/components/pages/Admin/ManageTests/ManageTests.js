import React from 'react';

export const ManageTests = ({
    children, 
    type, 
}) => {

    return (
        <div className='main-container'>
            <div className="headers-container">
                <h1> Available Tests for </h1>
                <h1 className="type"> {type} </h1>
            </div>
            <div className="filter-container">
                <label> Filter name by keywords: </label>
                <input id='filter-content' type='text' placeholder='Enter a list of keywords separated by commas'/>
                <label id='filter-state'></label>
                <label id='amount-filtered'></label>
            </div>
            <div className="table-container">
                <table id='tests-table'>
                    <tr>
                        <th> ID </th>
                        <th> Question Text and Tags </th>
                        <th> Last Update </th>
                        <th> Question Type </th>
                        <th> # of Tests </th>
                    </tr>
                    <tr >
                        {/* {children.map(({ ID, Link, name, update, type, version }) => (
                            
                        <td> {ID} </td>
                        <td> {Link} </td>
                        <td> {name} </td>
                        <td> {update} </td>
                        <td> {type} </td>
                        <td> {version} </td>
                        <td> </td>
                        ))} */}
                    </tr>
                </table>
            </div>

            <label type="text" id="showing-questions"> showing {`SOMETHING`} of available Tests </label>

            <div id="buttons-container">
                <button> {`<<`} Back </button>
                <button> Create a Test {`>>`} </button>
            </div>
            
        </div>
    )
};
