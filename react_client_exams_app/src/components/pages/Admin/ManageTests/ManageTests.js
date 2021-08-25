import React, { useEffect, useState }   from 'react';
import styles                           from './ManageTests.css'

export const ManageTests = ({
    children, 
    type, 
}) => {

    const [filter, setFilter] = useState(false);
    const [filterContent, setFilterContent] = useState("");

    useEffect(() => {
        document.title = "Manage Tests";
    }, [])

    return (
        <div className='manage_tests'>
            <div id="headers__container">
                <h1> Available Tests for </h1>
                <h1 id="type"> {type} </h1>
            </div>
            <div id="filter__container">
                <div id="filter_keywords__container">    
                    <label> Filter name by keywords: </label>
                    <input id="filter__input" type='text' value={filterContent}
                            onChange={(e) => { setFilterContent(e.target.value); filterContent === "" ? setFilter(false) : setFilter(true)} }
                            placeholder='Enter a list of keywords separated by commas'/>
                    <label id="filter_state"> Filter is {filter === false ? "OFF" : "ON"}  </label>
                </div>
                <label id="amount_filtered"> Filtered {`AMOUNT`} of total {`AMOUNT`} </label>
            </div>
            <div id="table__container">
                <table id='tests__table'>
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
                
                <label type="text" id="showing_tests"> showing 1-{`AMOUNT`} of available Tests </label>
            </div>

            <div id="buttons__container">
                <button onClick={       Back()      }>          {`<<` } Back        </button>
                <button onClick={  Create_A_Test()  }>      Create a Test {`>>`}    </button>
            </div>

        </div>
    )
};

// NEED TO CHECK WHY THESE GUYS AUTOMATICALLY START

function Back() {
    // window.location.href = history.back;
}

function Create_A_Test() {
    // window.location.href = "/new-question";
}