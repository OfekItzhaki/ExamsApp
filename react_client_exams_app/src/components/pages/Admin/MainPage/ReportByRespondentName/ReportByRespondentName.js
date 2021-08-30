import React, { useEffect, useState }   from 'react';
import        { filter }                from 'minimatch';
import        { useHistory }            from 'react-router-dom';
import styles                           from './ReportByRespondentName.css';

export const ReportByRespondentName = ({ title }) => {
    
    // ------------------------ Fetch Info Hooks -----------------------
    
    const [ students,            setStudents         ]       = useState(null); 
    const [ studentTests,        setStudentTests     ]       = useState(null); 

    // ------------------------- Content Hooks -------------------------

    const [ filterContent,       setFilterContent    ]       = useState("");
    const [ respondentName,      setRespondentName   ]       = useState("");
    const [ respondentID,        setRespondentID     ]       = useState(null);

    const handleRespondentClick = (name, id) => {
        console.log("handle respondent click")
        setRespondentName(name);
        setRespondentID(id);
    }


    // ?????????????????????????????
    const calcAverageGrade = () => {
        const tests = [];
        if (studentTests !== null && respondentID !== 0) {
            studentTests.filter((studentTest) => studentTest.studentID === respondentID).map((studentTest) =>
                tests.push(studentTest)
            );
            console.log(tests);
        }
    }

    const history = useHistory();

    const Back = () => {
        history.goBack();
    }

    const fetchStudents = () => {
        fetch("http://localhost:8000/students", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .catch((err) => console.log('error fetching students:' + err))
      }

      const fetchStudentTests = () => {
        fetch("http://localhost:8000/studentTests", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => setStudentTests(data))
        .catch((err) => console.log('error fetching student tests:' + err))
      }


    useEffect(() => {
        document.title = "Report by Name";
    }, [])
    

    useEffect(() => {
        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check 
            fetchStudents();
            fetchStudentTests();
        }

        calcAverageGrade();

        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    return (
        <div className="report_by_name noselect">
            <div id="headers__container">
                <h1> Report by Respondent Name </h1>
            </div>

            <div id="content__container">
                <div id="respondent__container">
                    <h2> Find a respondent </h2>
                    <p> To find a respondent, start typing a name below, </p>
                    <p> then select a respondent from the list that will appear. </p>
                    <div id="filter_name__container">    
                        <label> Respondent's name: </label>
                        <input id="filter__input" type='text' value={filterContent} placeholder="Enter a name" onChange={(e) => setFilterContent(e.target.value) } />
                    </div>

                    <table id="respondents__table">
                        <tbody>
                            <tr className="header_row border_bottom">
                                <th> ID             </th>
                                <th> Respondent     </th>
                                <th> Email          </th>
                                <th> Last Activity  </th>
                            </tr>

                            {students && students.filter((student) => student.fullName.includes(filterContent)).map((student) => (
                            <tr key={student.id} onClick={() => handleRespondentClick(student.fullName, student.id)}>
                                <td> {student.id}               </td>
                                <td> {student.fullName}         </td>
                                <td> {student.email}            </td>
                                <td> {student.lastActivity}     </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div id="activity_report__container" className={respondentID === null ? "hidden" : "visible"}>
                    <h2> Activity Report for: {respondentName} </h2>
                    <div id="above_activity__container">
                        <label type="text" id="explanation">    Click a test to show its results           </label>
                        <label type="text" id="average_grade">  Average grade for a test: {}               </label>
                    </div>

                    <table id="activity_report__table">
                        <tbody>
                            <tr className="header_row border_bottom">
                                <th> Instance       </th>
                                <th> Test ID        </th>
                                <th> Test Name      </th>
                                <th> Grade          </th>
                                <th> Last Activity  </th>
                            </tr>

                            {studentTests && studentTests.filter((studentTest) => studentTest.studentID === respondentID).map((studentTest) => (
                            <tr key={studentTest.id}>
                                <td> {studentTest.instance}             </td>
                                <td> {studentTest.testID}               </td>
                                <td> {studentTest.testName}             </td>
                                <td> {studentTest.grade}                </td>
                                <td> {studentTest.lastActivity}         </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div id="buttons__container">
                        <button className="regular__button" onClick={() => Back() }> {`<<` } Back </button>
                </div>
            </div>
        </div>
    )
};