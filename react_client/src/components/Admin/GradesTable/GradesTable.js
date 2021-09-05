import styles                   from './GradesTable.css';

export const GradesTable = ({ test, studentTests, handleRespondentClick }) => {

    let numOfQuestions = 0;

    return (
        <>
            <table id="grades__table">
                <tbody>
                    <tr className="header_row space_under border_bottom">
                        <th>        ID                                      </th>
                        <th>        Respondent                              </th>
                        <th>        Submitted                               </th>
                        <th>        Number of Questions Answered            </th>
                        <th>        Grade                                   </th>
                    </tr>

                    {studentTests && studentTests.filter((studentTest) => studentTest.id === test.id).map((studentTest) => (                             
                        <tr onClick={() => handleRespondentClick(studentTest.id)}>
                            <td key={studentTest.id}>                   {  studentTest.id           } </td>
                            <td key={studentTest.studentName}>          {  studentTest.studentName  } </td>
                            <td key={studentTest.submitted}>            {  studentTest.submitted    } </td>
                            {  <td key={studentTest.questions}>         {  studentTest.questions.filter((question) => question.answer === "").map((answer, question) => {
                                if (answer !== "") numOfQuestions++;

                                if (studentTest.questions[studentTest.questions.length - 1].id === question.id) return numOfQuestions;
                                else return "";
                            })} </td> }                         
                            
                            {/* this td is responsible for resetting the num of questions counter */}
                            <td key="hidden" style={{display: "none"}}> {  numOfQuestions = 0  } </td>

                            <td key={studentTest.grade}>                {  studentTest.grade        } </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};
