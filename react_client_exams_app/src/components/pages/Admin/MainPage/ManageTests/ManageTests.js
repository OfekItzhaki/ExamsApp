import React, { useEffect, useState     }   from 'react';
import        { TestTable               }   from '../../../../Admin/TestTable/TestTable';
import        { useHistory, useLocation }   from 'react-router-dom';
import styles                               from './ManageTests.css'

export default function ManageTests() {

    // ---------------------------- Fetch Info Hooks ---------------------------

    const [ tests,          setTests            ] = useState(null);

    const [ field,          setField            ] = useState(null);

    // ----------------------------- Content Hooks -----------------------------

    const [filter,          setFilter           ] = useState(false);
    const [filterContent,   setFilterContent    ] = useState("");

    // ----------------------------------------------------------------------------

    const location = useLocation();
    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    const createTest = () => {
        history.push({
            pathname: '/admin/create-test',
            // search: '?update=true',  // query string
            state: {  // location state
                // update: true,
              field: field,
              test: null
            },
        }); 
    }

    const fetchTests = () => {
        fetch("http://localhost:8000/tests", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => { 
          setTests(data); 
        })
        .catch((err) => console.log('error fetching tests:' + err))
    }

    const handleFilterChange = (value) => {
        setFilterContent(value);
        value === "" ? setFilter(false) : setFilter(true);
    }

    useEffect(() => {
        document.title = "Manage Tests";
    }, [])

    // Meant for fetching the necessary information on first render
    useEffect(() => {
        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check
            fetchTests();
        }

        if (location.state) {
            if (location.state.field) setField(location.state.field);
        }

        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    return (
        <div className="manage_tests noselect">
            <div id="headers__container">
                <h1 className="page__header"> Available Tests for {field ? field : ""} </h1>
            </div>

            <div id="filter__container">
                <div id="filter_keywords__container">    
                    <label> Filter name by keywords: </label>
                    <input id="filter__input" type="text" value={filterContent} onChange={(e) => handleFilterChange(e.target.value) } placeholder="Enter a list of keywords separated by commas"/>
                    <label id="filter_state"> Filter is {filter === false ? "OFF" : "ON"}  </label>
                </div>
                <label id="amount_filtered"> Showing {`AMOUNT`} of total {`AMOUNT`} </label>
            </div>

            <div id="table__container">
                { tests && <TestTable tests={tests} /> }
                <label type="text" id="showing_tests"> showing 1-{`AMOUNT`} of available Tests </label>
            </div>

            <div id="buttons__container">
                <button className="regular__button" onClick={() =>  back()         }>      {`<<` } Back            </button>
                <button className="regular__button" onClick={() =>  createTest()  }>      Create a Test {`>>`}    </button>
            </div>

        </div>
    )
};