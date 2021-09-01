import styles                   from './QuestionStatisticsTable.css';

export const QuestionStatisticsTable = ({ test, studentTests, handleRespondentClick, handleQuestionClick }) => {

    let numOfQuestions = 0;

    return (
        <>
            <table id="question_statistics__table">
                <tbody>
                    <tr className="header_row space_under border_bottom">
                        <th>        ID                                      </th>
                        <th>        Question                                </th>
                        <th>        Number of Submissions                   </th>
                        <th>        Percentage Answered Correctly           </th>
                    </tr>

                    { studentTests && studentTests.filter((studentTest) => studentTest.testID === test.testID).map((studentTest) => (  
                        <>
                            {studentTest.questions.filter((question) => question.answer === "").map((answer, questionID) => {
                                    if (answer !== "") numOfQuestions++;

                                    if (studentTest.questions[studentTest.questions.length - 1].questionID === questionID) return numOfQuestions;
                                    else return "";
                            })};
                        </>
                    ))}

                    {/* {studentTests && studentTests.filter((studentTest) => studentTest.testID === test.testID).map((studentTest) => (                             
                        <tr onClick={() => handleRespondentClick(studentTest.studentID)}>
                            <td key={studentTest.stID}>                 {  studentTest.stID         } </td>
                            <td key={studentTest.studentName}>          {  studentTest.studentName  } </td>
                            <td key={studentTest.submitted}>            {  studentTest.submitted    } </td>
                            {  <td key={studentTest.questions}>         {  studentTest.questions.filter((question) => question.answer === "").map((answer, questionID) => {
                                if (answer !== "") numOfQuestions++;

                                if (studentTest.questions[studentTest.questions.length - 1].questionID === questionID) return numOfQuestions;
                                else return "";
                            })} </td> }                         
                            
                            <td key="hidden" style={{display: "none"}}> {  numOfQuestions = 0  } </td>

                            <td key={studentTest.grade}>                {  studentTest.grade        } </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </>
    )
};
