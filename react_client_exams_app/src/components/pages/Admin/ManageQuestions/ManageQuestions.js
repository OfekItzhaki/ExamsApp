import React, { useEffect, useState }   from 'react';
import styles                           from './ManageQuestions.css';

export const ManageQuestions = ({
    children, 
    type, 
}) => {

    const [filter, setFilter] = useState(false);
    const [filterContent, setFilterContent] = useState("");

    useEffect(() => {
        document.title = "Manage Questions";
    }, [])

    return (
        <div className='manage_questions'>
            <div id="headers__container">
                <h1> Available Questions for </h1>
                <h1 id="type"> {type} </h1>
            </div>
            <div id="filter__container">
                <div id="filter_tags__container">    
                    <label> Filter by tags or content: </label>
                    <input id="filter__input" type='text' 
                        value={filterContent}
                        onChange={(e) => { setFilterContent(e.target.value); filterContent === "" ? setFilter(false) : setFilter(true)} }
                        placeholder="Enter a list of keywords separated by commas"/>
                    <label id="filter__state"> Filter is {filter === false ? "OFF" : "ON"} </label>
                </div>
                <label id="amount__filtered"> Filtered {`AMOUNT`} of total {`AMOUNT`} </label>
            </div>
            <div id="table__container">
                <table id="questions__table">
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
                
                <label type="text" id="showing_questions"> showing 1-{`AMOUNT`} of filtered Questions </label>
            </div>

            <div id="buttons__container">
                <button onClick={       Back()      }>  {`<<` } Back         </button>
                <button onClick={   New_Question()  }>  New Question {`>>`}  </button>
            </div>

        </div>
    )
};

// NEED TO CHECK WHY THESE GUYS AUTOMATICALLY START

function Back() {
    // window.location.href = history.back;
}

function New_Question() {
    // window.location.href = "/new-question";
}