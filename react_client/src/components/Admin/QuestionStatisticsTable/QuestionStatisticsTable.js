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

                    { studentTests && studentTests.filter((studentTest) => studentTest.id === test.id).map((studentTest) => (  
                        <>
                            {studentTest.questions.filter((question) => question.answer === "").map((answer, id) => {
                                    if (answer !== "") numOfQuestions++;

                                    if (studentTest.questions[studentTest.questions.length - 1].id === id) return numOfQuestions;
                                    else return "";
                            })};
                        </>
                    ))}


                    
                </tbody>
            </table>
        </>
    )
};
