import React  from 'react';
import styles from './ManageQuestions.css';

export const ManageQuestions = ({
    children, 
    type, 
}) => {



    return (
        <div className='main-container'>
            <div className="headers-container">
                <h1> Available Questions for </h1>
                <h1 className="type"> {type} </h1>
            </div>
            <div className="filter-container">
                <label> Filter by tags or content: </label>
                <input id='filter-content' type='text' placeholder='Enter a list of keywords separated by commas'/>
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
                
                <label type="text" id="showing-questions"> showing {`SOMETHING`} of filtered Questions </label>
            </div>

            <div id="buttons-container">
                <button onClick={Back()}> {`<<`} Back </button>
                <button onClick={New_Question()}> New Question {`>>`} </button>
            </div>

        </div>
    )
};

function Back() {
    
}

function New_Question() {

}