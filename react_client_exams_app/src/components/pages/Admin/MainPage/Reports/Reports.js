import React, { useEffect, useState     }   from 'react';
import        { useHistory, useLocation }   from 'react-router-dom';
import styles                               from './Reports.css';

export default function Reports() {

    // ------------------------ Fetch Info Hooks -----------------------

    const [ tests,       setTests       ]   = useState(null);
    const [ field,       setField       ]   = useState(null);

    // ------------------------- Content Hooks -------------------------

    const [ testChosen,  setChosenTest  ]   = useState(null);
    const [ dateFrom,    setDateFrom    ]   = useState("");
    const [ dateTo,      setDateTo      ]   = useState("");
    const [ dateRange,   setDateRange   ]   = useState("");
    const [ past,        setPast        ]   = useState(true);

    const location = useLocation();
    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    const handleDateCheckChange = (checked) => {
        setPast(checked);

        if (checked) {
            document.getElementById("date__from").value = new Date().toISOString().substring(0, 10); 
            document.getElementById("date__to").value = new Date().toISOString().substring(0, 10);
            setDateRange(`${document.getElementById("date__from").value} - ${document.getElementById("date__to").value}`)
        } else {
            setDateRange("any date in the past");
        }
    }

    const handleTestChange = (id) => {
        setChosenTest(tests.find((test) => test.testID.toString() === id));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        generateReport();
    }

    const generateReport = () => {
        console.log("generate report");
        setDateRange(dateFrom - dateTo);

        history.push({
            pathname: '/admin/test-report',
            // search: '?update=true',  // query string
            state: {  // location state
                // update: true,
              test: testChosen,
              dateRange: dateRange, 
              field: field
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

          setChosenTest(data[0]);
          setDateRange("any date in the past");
        })
        .catch((err) => console.log('error fetching tests:' + err))
    }
    
    useEffect(() => {
        document.title = "Reports";
    }, [])

    useEffect(() => {
        let isMounted = true;           // note mutable flag
    
        if (isMounted) {                // add conditional check
            fetchTests();
        }

        let today = new Date();
        let todayDate = today.toISOString().split("T")[0];
        document.getElementById("date__from").setAttribute("min", "1999-01-01");
        document.getElementById("date__from").setAttribute("max", todayDate);

        document.getElementById("date__to").setAttribute("min", "1999-01-01");
        document.getElementById("date__to").setAttribute("max", todayDate);

        setField(location.state.field);  // for location state
    
        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    return (
        <div className="reports noselect">
            <div id="headers__container">
                <h1 className="page__header"> Test Report for {field} </h1>
            </div>
            <div id="content__container">
                <form id="report__form" onSubmit={handleSubmit}>
                    <table id="content__table">
                        <tbody>
                            <tr>
                                <td>
                                    <label id="label__test_name">       Select Test:            </label>
                                </td>

                                <td> <select id="test__select" onChange={(e) => handleTestChange(e.target.value)}>
                                     {tests && tests.map((test) => {
                                         
                                         return (
                                             <option key={test.testID} value={test.testID}> {test.testName} </option>
                                         )
                                    })}
                                     </select> </td>
                            </tr>
                            <tr>
                                <td>
                                    <label id="label__date_range">      Date Range:             </label>
                                </td>
                                <td>
                                    <label id="label__from">            From:                   </label>
                                    <input id="date__from"  type="date" onChange={ (e) => setDateFrom(e.target.value) }  disabled={past}  required/>
                                </td>
                                <td>
                                    <label id="label__to">              To:                     </label>
                                    <input id="date__to"    type="date" onChange={ (e) => setDateTo(e.target.value)   }  disabled={past}  required/>
                                </td>
                            </tr>
                            <tr>
                                <td>  </td>
                                <td>
                                    <label id="label__OR">              OR                      </label>
                                </td>
                            </tr>

                            <tr>
                                <td>  </td>
                                <td>
                                    <input type="checkbox" checked={past} onChange={ (e) => handleDateCheckChange(e.target.checked) } />
                                    <label id="label__past">                Any date in the past        </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="button__container">
                        <button className="regular__button" onClick={() => back() }>     {`<<` } Back                </button>
                        <button className="regular__button" type="submit">               Generate Report             </button>
                    </div>
                </form>
            </div>

        </div>
    )
};