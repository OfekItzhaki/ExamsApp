import React,   { useEffect, useState }          from 'react';
import          { SummaryTable }                 from '../../../../../Admin/SummaryTable/SummaryTable';
import          { useHistory, useLocation }      from 'react-router-dom';
import styles                                    from './TestReport.css'

export const TestReport = () => {

    // ----------------------------- Fetch Info Hooks ----------------------------

    const [ studentTests,       setStudentTests           ] = useState(null);

    const [ test,               setTest                   ] = useState(null);
    const [ field,              setField                  ] = useState("");
    const [ dateRange,          setDateRange              ] = useState("");
    const [ questions,          setQuestions              ] = useState([]);
    
    // ------------------------------ Summary Hooks ------------------------------
    
    const [ averageGrade,       setAverageGrade           ] = useState(0);
    // const [ numOfQuestions,      setNumOfQuestions      ]       = useState(0);

    // ------------------------------ Grades Hooks -------------------------------

    const [ respondentChosen,   setRespondentChosen       ] = useState(false);

    // ---------------------------- Statistics Hooks -----------------------------

    const [ filterContent,      setFilterContent          ] = useState("");

    // ---------------------------------------------------------------------------

    const location = useLocation(); // for location state
    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    const expandAll = () => {

    }

    const exportToExecl = () => {

    }

    const printReport = () => {

    }

    const countNumberOfQuestions = () => {
        let counter = 0;
        if (questions) {
            questions.map(() => counter++);
        }

        return counter;
    }

    const fetchStudentTests = () => {
        fetch("http://localhost:8000/studentTests", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => { 
          setStudentTests(data); 
        })
        .catch((err) => console.log('error fetching student tests:' + err))
    }

    useEffect(() => {
        document.title = "Test Report";
    }, [])

    useEffect(() => {
        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check
            fetchStudentTests();
        }

        setField(location.state.field);
        setTest(location.state.test)
        setDateRange(location.state.dateRange);

        countNumberOfQuestions();
    }, [])

    return (
        <div className="test_report noselect">
            <div id="headers__container">
                <h1> Test result for {field} </h1>
            </div>

            <div id="content__container">
            <div id="summary_tables__container">
                    {test && <SummaryTable test={test} dateRange={dateRange} countNumberOfQuestions={countNumberOfQuestions}/>}
                </div>
                <div id="grades__container">

                <table id="grades__table">
                        <tbody>
                            <tr className="header_row space_under border_bottom">
                                <th>        ID                                      </th>
                                <th>        Respondent                              </th>
                                <th>        Submitted                               </th>
                                <th>        Number of Questions Answered            </th>
                                <th>        Grade                                   </th>
                            </tr>

                            {studentTests && studentTests.map((studentTest) => (                             
                                <>
                                </>
                            ))}
                        </tbody>
                    </table>

                    <div id="buttons__container">
                        <button className="regular__button" onClick={() => back()}>             {`<<`} Back         </button>
                        <button className="regular__button" onClick={() => exportToExecl()}>    Export To Excel     </button>
                        <button className="regular__button" onClick={() => printReport()}>      Print Report        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};