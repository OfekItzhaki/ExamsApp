import React, { useEffect, useState }   from 'react';
import styles                           from './ReportByRespondentName.css';

export const ReportByRespondentName = ({}) => {
    
    const [ students,            setStudents         ]       = useState(null); 
    const [ tests,               setTests            ]       = useState(null); 
    const [ studentTests,        setStudentTests     ]       = useState(null); 

    const [ filterContent,       setFilterContent    ]       = useState("");
    const [ respondentName,      setRespondentName   ]       = useState("");
    const [ respondentID,        setRespondentID     ]       = useState(0);
    const [ averageGrade,        setAverageGrade     ]       = useState(0);

    const handleRespondentClick = (name, id) => {
        setRespondentName(name);
        setRespondentID(id);
        console.log(respondentID);
    }
    
    // let input = document.getElementById("filter__input");
    // if (input) {
    //     input.addEventListener("keyup", (event) => {
    //         if (event.key === "Enter") {
    //             if (filterContent === "") {
    //                 setRespondentChosen(false)
    //             } else {
    //                 setRespondentChosen(true)}
    //             }
    //     });
    // }

    useEffect(() => {
        document.title = "Report by Name";

        fetch("http://localhost:8000/students")
        .then(res => {
            return res.json();
        })
        .then((data) => {
        //    console.log(data); 
           setStudents(data);
        });

        fetch("http://localhost:8000/tests")
        .then(res => {
            return res.json();
        })
        .then((data) => {
        //    console.log(data); 
           setTests(data);
        });

        fetch("http://localhost:8000/studentTests")
        .then(res => {
            return res.json();
        })
        .then((data) => {
           console.log(data); 
            setStudentTests(data);
        });

    }, [])

    return (
        <div className="report_by_name noselect">
            <div id="headers__container">
                <h1> Report by Respondent Name </h1>
            </div>

            <div id="content__container">
                <div id="respondent__container">
                    <h2> Find a respondent </h2>
                    <p>
                        To find a respondent, start typing a name below.
                        Then select a respondent from the list that will appear.
                        <br></br>
                        *Tip: To show all respondents, press the enter.*
                    </p>
                    <div id="filter_name__container">    
                        <label> Respondent's name: </label>
                        <input id="filter__input" type='text' value={filterContent} onChange={(e) => setFilterContent(e.target.value) } />
                    </div>

                    <table id="respondents__table">
                        <tbody>
                            <tr>
                                <th> ID             </th>
                                <th> Respondent     </th>
                                <th> Email          </th>
                                <th> Last Activity  </th>
                            </tr>

                            {students && students.filter((student) => student.fullName.includes(filterContent)).map((student) => (
                            <tr onClick={() => handleRespondentClick(student.fullName, student.id)} key={student.id}>
                                <td> {student.id}               </td>
                                <td> {student.fullName}         </td>
                                <td> {student.email}            </td>
                                <td> {student.lastActivity}     </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div id="activity_report__container" className={respondentID === 0 ? "hidden" : "visible"}>
                    <h2> Activity Report for: {respondentName} </h2>
                    <div id="above_activity_table">
                        <label type="text" id="explanation">    Click a test to show its results           </label>
                        <label type="text" id="average_grade">  Average grade for a test: {averageGrade}   </label>
                    </div>

                    <table id="activity_report__table">
                        <tbody>
                            <tr>
                                <th> Instance       </th>
                                <th> Test ID        </th>
                                <th> Test Name      </th>
                                <th> Grade          </th>
                                <th> Last Activity  </th>
                            </tr>

                            {studentTests && studentTests.filter((studentTest) => studentTest.studentID !== respondentID).map((studentTest) => (
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
                        <button onClick={ Back() }> {`<<` } Back </button>
                </div>
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