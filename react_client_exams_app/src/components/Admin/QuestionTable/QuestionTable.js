import styles                   from './QuestionTable.css';
import { Link }                 from 'react-router-dom';

export const QuestionTable = ({ questions, handleDelete }) => {
    return (
        <table id="questions__table">
            <tbody>
                <tr className="space_under header_row border_bottom">
                    <th> ID                     </th>
                    <th> Question Text and Tags </th>
                    <th> Last Update            </th>
                    <th> Question Type          </th>
                    <th> # of Tests             </th>
                    <th></th>
                </tr>
                

                {questions.map((question) => (
                <tr className="space_under border_bottom" key={question.id}>
                    <td className="question_id">            {question.id}                           </td>
                    <td className="question_title_tags">    {question.title} <br/> {question.tags.map((tag) => <Link> {tag}, </Link>) } </td>
                    <td className="question_update">        {question.last_update}                  </td>
                    <td className="question_type">          {question.type}                         </td>
                    <td className="question_tests">         {question.num_of_tests}                 </td>
                    <td className="buttons">
                        <button> Show       </button>
                        <button> Edit       </button>
                        <button> Duplicate  </button>
                        <button  onClick={() => handleDelete(question.id)}> Delete </button>
                    </td>
                </tr> ))}
            
            </tbody>
        </table>
    )
};
