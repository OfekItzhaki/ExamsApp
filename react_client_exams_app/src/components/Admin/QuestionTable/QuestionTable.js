import styles                   from './QuestionTable.css';
import { Link }                 from 'react-router-dom';

export const QuestionTable = ({ questions, tags, handleDelete }) => {
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
                    <td className="question_title_tags">    {question.title} <br/> {question.tags.map((tag) => { 
                        return (
                        <>
                            <button className="like_link_button"> {tag} </button> 
                            <label className="like_link_label"> {tag !== question.tags[question.tags.length - 1] ? " | " : ""} </label>
                        </>)
                        })} </td>
                    <td className="question_update">        {question.lastUpdate}                   </td>
                    <td className="question_type">          {question.type}                         </td>
                    <td className="question_tests">         {question.numOfTests}                   </td>
                    <td className="buttons">
                        <button className="regular__button"> Show       </button>
                        <button className="regular__button"> Edit       </button>
                        <button className="regular__button"> Duplicate  </button>
                        <button className="regular__button"  onClick={() => handleDelete(question.id)}> Delete </button>
                    </td>
                </tr> ))}
            
            </tbody>
        </table>
    )
};
