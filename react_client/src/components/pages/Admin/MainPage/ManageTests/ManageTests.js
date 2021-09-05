import React, { useEffect, useState     }   from 'react';
import        { TestTable               }   from '../../../../Admin/TestTable/TestTable';
import        { useHistory, useLocation }   from 'react-router-dom';
import        { Filter                  }   from '../../../../Admin/Filter/Filter';
import styles                               from './ManageTests.css'

export default function ManageTests() {

    // ---------------------------- Fetch Info Hooks ---------------------------

    const [ tests,              setTests           ] = useState(null);

    const [ field,              setField           ] = useState(null);

    // ----------------------------- Content Hooks -----------------------------

    const [ filter,             setFilter          ] = useState(false);
    const [ filterContent,      setFilterContent   ] = useState("");

    const [ filterStatus,       setFilterStatus    ]  = useState(false);
    const [ filterByTags,       setFilterByTags    ]  = useState(true);
    const [ filteredTests,      setFilteredTests   ]  = useState([]);
    const [ filterBy,           setFilterby        ]  = useState([{ name: "content" }]);

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

    const handleFilterContentChange = (value) => {
        
        if (value === "") setFilterStatus(false);
        else setFilterStatus(true);

        let newTests = tests;
        setFilteredTests(newTests.filter((test) => { 

            if (test.testName.toLowerCase().includes(value)) return test;
            else return null;

        }));
    }

    const handleFilterByChange = (value) => {
        if (value === "tags") setFilterByTags(true);
        else setFilterByTags(false);
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

            { tests && filteredTests && <Filter filterStatus={filterStatus} totalAmount={tests.length} filteredAmount={filteredTests.length} 
                handleFilterByChange={handleFilterByChange} handleFilterContentChange={handleFilterContentChange} filterBy={filterBy}/> }

            { tests && filteredTests && <TestTable tests={tests} filteredTests={filteredTests}/> }

            <div id="buttons__container">
                <button className="regular__button" onClick={() =>  back()         }>      {`<<` } Back            </button>
                <button className="regular__button" onClick={() =>  createTest()  }>      Create a Test {`>>`}    </button>
            </div>

        </div>
    )
};