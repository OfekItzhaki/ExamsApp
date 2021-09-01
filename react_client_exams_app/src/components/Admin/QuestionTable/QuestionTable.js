import styles                   from './QuestionTable.css';
import { useState }             from 'react';

export const QuestionTable = ({ questions, filteredQuestions, tests, handleNext, handleShowAll, handleDelete }) => {

    let numOfQuestions = 0;

    return (
        <div id="questions__container">
            <div id="table__container">
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
                                        <button className="like_tag_button" key={tag}>      {tag}                                                           </button> 
                                        <label className="like_link_label">                 {tag !== question.tags[question.tags.length - 1] ? " | " : ""}  </label>
                                    </>)
                                })} </td>
                            <td className="question_update" key={question.lastUpdate}>      {question.lastUpdate}       </td>
                            <td className="question_type"   key={question.type}>            {question.type}             </td>
                            {  <td key={tests ? tests.test : ""}>                                        {tests && tests.test.map((test) => {
                                <>
                                    { test.questions.filter((question) => question.answer === "").map((answer, questionID) => {
                                        if (answer !== "") numOfQuestions++;

                                        if (test.questions[test.questions.length - 1].questionID === questionID) return numOfQuestions;
                                        else return "";
                                    }) };
                                </>
                                
                                if (numOfQuestions !== 0) return numOfQuestions;
                                else return "";
                            })} </td> }                         

                            <td key="hidden" style={{display: "none"}}> {  numOfQuestions = 0  } </td>

                            <td className="buttons">
                                <button className="regular__button"> Show                                               </button>
                                <button className="regular__button"> Edit                                               </button>
                                <button className="regular__button"> Duplicate                                          </button>
                                <button className="regular__button"  onClick={() => handleDelete(question.id)}> Delete  </button>
                            </td>
                        </tr> ))}
                    </tbody>
                </table>
            </div>
            <div id="under_table__container">
                <label type="text" id="showing_questions"> showing 1-{filteredQuestions ? filteredQuestions.length : ""} of filtered Questions </label>
                <button className="regular__button" onClick={() =>   handleNext()          }> Next {`>>`} </button>
                <button className="regular__button" onClick={() =>   handleShowAll()       }> Show All {questions && questions.length} questions </button>
            </div>
        </div>
    )
};
