import React, { useEffect, useState }   from 'react';
import styles                           from './TestReport.css'

export const TestReport = ({
    children, 
    type, 
    testName
}) => {
    const [filterContent,       setFilterContent]       = useState("");
    const [respondentChosen,    setRespondentChosen]    = useState(false);
    const [averageGrade,        setAverageGrade]        = useState(0);

    useEffect(() => {
        document.title = "Test Report";
    }, [])

    return (
        <div className='test_report'>
            <div id="headers__container">
                <h1> Test result for {testName} </h1>
            </div>

            <div id="content__container">
                <h1> Summary </h1>
                <div id="Summary__container">
                    
                </div>

                {/* <div id="filter_name__container">    
                        <label> Respondent's name: </label>
                        <input id="filter__input" type='text' value={filterContent}
                                onChange={(e) => { setFilterContent(e.target.value); filterContent === "" ? setRespondentChosen(false) : setRespondentChosen(true)} } />
                </div> */}

                <button onClick={      Expand_All()         }>  Expand All      </button>
                <table id='Details__table'>
                    <tr>
                        <th>        ID                     </th>
                        <th>        Question               </th>
                        <th>        Answered Correctly?    </th>
                        <th>        Date Answered          </th>
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
                </table>

                <div id="buttons__container">
                    <button onClick={   Back()              }>  {`<<` } Back    </button>
                    <button onClick={   Export_To_Excel()   }>  Export To Excel </button>
                    <button onClick={   Print_Report()      }>  Print Report    </button>
                </div>
            </div>
        </div>
    )
};

// NEED TO CHECK WHY THESE GUYS AUTOMATICALLY START

function Expand_All() {
    // window.location.href = history.back;
}

function Back() {
    // window.location.href = history.back;
}

function Export_To_Excel() {

}

function Print_Report() {
    // window.location.href = "/new-question";
}