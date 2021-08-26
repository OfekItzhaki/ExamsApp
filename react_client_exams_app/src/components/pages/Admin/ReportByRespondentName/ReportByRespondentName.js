import React, { useEffect, useState }   from 'react';
import styles                           from './ReportbyRespondentName.css'

export const ReportByRespondentName = ({
    children, 
    type, 
}) => {                                                     // LOOk OVER THIS CODE

    const [ testName,            setTestName         ]       = useState(0);
    
    const [ filterContent,       setFilterContent    ]       = useState("");
    const [ respondentChosen,    setRespondentChosen ]       = useState(false);
    const [ averageGrade,        setAverageGrade     ]       = useState(0);

    let input = document.getElementById("filter__input");
    if (input) {
        // input.addEventListener("keyup", (event) => {
        //     if (event.key === "Enter") {
        //         if (filterContent === "") {
        //             setRespondentChosen(false)
        //         } else {
        //             setRespondentChosen(true)}
        //         }
        // });
    }

    useEffect(() => {
        document.title = "Report by Name";
    }, []);

    return (
        <div className='report_by_name noselect'>
            <div id="headers__container">
                <h1> Report by Respondent Name </h1>
            </div>

            <div id="content__container">
                <div id="respondent__container">
                    <h1> Find a respondent </h1>
                    <p>
                        To find a respondent, start typing a name below.
                        Then select a respondent from the list that will appear.
                        <br></br>
                        *Tip: To show all respondents, press the enter.*
                    </p>
                    <div id="filter_name__container">    
                        <label> Respondent's name: </label>
                        <input id="filter__input" type='text' value={filterContent}
                                onChange={(e) => setFilterContent(e.target.value) } />
                    </div>

                    <table id='respondents__table'>
                        <tbody>
                            <tr>
                                <th> ID             </th>
                                <th> Respondent     </th>
                                <th> Email          </th>
                                <th> Last Activity  </th>
                            </tr>
                            {/* {{AdminMenu.map(({ title, content }) => (                              <<-------------------    EXAMPLE
                                            <Accordion title={title} content={content} />
                                        ))}}
                            <tr >                                                                 <<-------------------    EXAMPLE 2  
                                { {children.map(({ ID, Link, name, update, type, version }) => (
                                    
                                <td> {ID} </td>
                                <td> {Link} </td>
                                <td> {name} </td>
                                <td> {update} </td>
                                <td> {type} </td>
                                <td> {version} </td>
                                <td> </td>
                                ))}}
                            </tr> */}
                        </tbody>
                    </table>
                </div>

                <div id="activity_report__container" className={respondentChosen === false ? "hidden" : "visible"}>
                    <div id="above_activity_table">
                        <label type="text" id="explanation">    Click a test to show its results                </label>
                        <label type="text" id="average_grade">  Average grade for a test: {averageGrade}        </label>
                    </div>

                    <table id="activity_report__table">
                        <tbody>
                            <tr>
                                <th> Instance       </th>
                                <th> Test Code      </th>
                                <th> Test Name      </th>
                                <th> Grade          </th>
                                <th> Last Activity  </th>
                            </tr>

                            <tr>

                            </tr>
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