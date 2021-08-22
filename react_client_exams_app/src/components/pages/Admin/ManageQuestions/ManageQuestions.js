import React from 'react';
import questions_styles from './ManageQuestions.css';

export const ManageQuestions = ({
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
                <input id='filter-content' type='text' placeholder='parameter'/>
                <label id='filter-state'></label>
                <label id='amount-filtered'></label>
            </div>
            <div className="table-container">
                <table id='questions-table'>
                    <tr>
                        <th> ID </th>
                        <th> Question Text and Tags </th>
                        <th> Last Update </th>
                        <th> Question Type </th>
                        <th> # of Tests </th>
                    </tr>
                    <tr >
                        {/* {children.map(({ ID, Tnt, update, type, amount }) => (
                            
                        <td> {ID} </td>
                        <td> {TnT} </td>
                        <td> {update} </td>
                        <td> {type} </td>
                        <td> {amount} </td>
                        <td> </td>
                        ))} */}
                    </tr>
                </table>
            </div>

        </div>
    )
};