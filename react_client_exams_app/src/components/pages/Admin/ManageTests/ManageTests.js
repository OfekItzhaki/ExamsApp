import React, { useEffect, useState }   from 'react';
import        { useHistory }            from 'react-router-dom';
import styles                           from './ManageTests.css'

export const ManageTests = (props) => {

    const [filter, setFilter] = useState(false);
    const [filterContent, setFilterContent] = useState("");

    const history = useHistory();

    const Back = () => {
        history.goBack();
    }

    const Create_Test = () => {
        // Open in the same window
        window.location.href = "/admin/create-test";
    }

    useEffect(() => {
        document.title = "Manage Tests";
    }, [])

    return (
        <div className="manage_tests noselect">
            <div id="headers__container">
                <h1> Available Tests for {props.field ? props.field.title : ""} </h1>
                <h1 id="field"> {props.field} </h1>
            </div>
            <div id="filter__container">
                <div id="filter_keywords__container">    
                    <label> Filter name by keywords: </label>
                    <input id="filter__input" type="text" value={filterContent}
                            onChange={(e) => { setFilterContent(e.target.value); filterContent === "" ? setFilter(false) : setFilter(true)} }
                            placeholder="Enter a list of keywords separated by commas"/>
                    <label id="filter_state"> Filter is {filter === false ? "OFF" : "ON"}  </label>
                </div>
                <label id="amount_filtered"> Filtered {`AMOUNT`} of total {`AMOUNT`} </label>
            </div>
            <div id="table__container">
                <table id="tests__table">
                    <tbody>
                        <tr className="header_row">
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
                    </tbody>
                </table>
                
                <label type="text" id="showing_tests"> showing 1-{`AMOUNT`} of available Tests </label>
            </div>

            <div id="buttons__container">
                <button onClick={() =>  Back()         }>      {`<<` } Back            </button>
                <button onClick={() =>  Create_Test()  }>      Create a Test {`>>`}    </button>
            </div>

        </div>
    )
};