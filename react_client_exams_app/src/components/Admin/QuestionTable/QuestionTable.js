import styles                   from './QuestionTable.css';
import { useState }             from 'react';

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
                

                {questions.map((question, i) => (
                <tr className="space_under border_bottom" key={question}>
                    <td className="question_id"           key={question.id}>        {question.id}                                                   </td>
                    <td className="question_title_tags"   key={question.title}>     {question.title} 
                    <br/>
                        {question.tags.map((tag) => { 
                            return (
                            <>
                                <button className="like_link_button" key={tag}>     {tag}                                                           </button> 
                                <label className="like_link_label">                 {tag !== question.tags[question.tags.length - 1] ? " | " : ""}  </label>
                            </>)
                        })} </td>
                    <td className="question_update" key={question.lastUpdate}>      {question.lastUpdate}       </td>
                    <td className="question_type"   key={question.type}>            {question.type}             </td>
                    <td className="question_tests"  key={question.numOfTests}>      {question.numOfTests}       </td>
                    <td className="buttons">
                        <button className="regular__button"> Show                                               </button>
                        <button className="regular__button"> Edit                                               </button>
                        <button className="regular__button"> Duplicate                                          </button>
                        <button className="regular__button"  onClick={() => handleDelete(question.id)}> Delete  </button>
                    </td>
                </tr> ))}
            
            </tbody>
        </table>
    )
};
