export const QuestionTableRow = ({ questions, handleDelete }) => {
    return (
        <>
            {questions.map((question) => (
            <tr key={question.id}>
                <td>    {question.id}              </td>
                <td>    {question.title}           </td>
                <td>    {question.tags}            </td>
                <td>    {question.last_update}     </td>
                <td>    {question.type}            </td>
                <td>    {question.num_of_tests}    </td>
                <td>
                    <button> Show       </button>
                    <button> Edit       </button>
                    <button> Duplicate  </button>
                    <button onClick={() => handleDelete(question.id)}> Delete </button>
                </td>
            </tr>
            ))}
        </>
    )
};
