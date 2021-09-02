import { useState }                 from 'react';
import styles                       from './QuestionTable.css';

export const QuestionTable = ({  manageQuestions, createEditTest, questions, filteredQuestions, tests, selectedQuestions, setSelectedQuestions, handleDelete, handleEdit, handleDuplicate, handleShowSelected, handleShowAll}) => {

    const [ visibility, setVisibility ] = useState(false);

    const handleNext = () => {
        
    }

    const handleShow = (event, questionID) => {
        event.preventDefault();
        setVisibility(!visibility);
    }

    const handleQuestionClick = (event, question) => {
        event.preventDefault();
        if (createEditTest) {
            // Case question is selected
            if (document.getElementById(`row_${question.questionID}`).className === "space_under border_bottom") {
                document.getElementById(`row_${question.questionID}`).className = "space_under border_bottom question_selected";

                let newSelectedQuestions = selectedQuestions;
                console.log(newSelectedQuestions)
                newSelectedQuestions.push(question);
                setSelectedQuestions(newSelectedQuestions);
            }

            // Case question is unselected
            else if (document.getElementById(`row_${question.questionID}`).className === "space_under border_bottom question_selected") {
                document.getElementById(`row_${question.questionID}`).className = "space_under border_bottom";

                let newSelectedQuestions = selectedQuestions;
                newSelectedQuestions.filter((q) => q.questionID === question.questionID);
                setSelectedQuestions(newSelectedQuestions);
            }
        }
    }

    let numOfTests = 0;
    let currentPage = 1;

    return (
        <div id="questions__container">
            <div id="table__container">
                <table id="questions__table">
                    <tbody>
                        {  manageQuestions === true && <tr className="space_under header_row border_bottom">
                            <th> ID                     </th>
                            <th> Question Text and Tags </th>
                            <th> Last Update            </th>
                            <th> Question Type          </th>
                            <th> # of Tests             </th>
                            <th></th>
                        </tr> }
                        

                        { questions && questions.map((question, i) => (
                        <tr id={`row_${question.questionID}`} className="space_under border_bottom" key={question}>
                            <td className="question_id"           key={question.questionID}>  {question.questionID} </td>
                            <td className="question_title_tags"   key={question.questionTitle} onClick={(e) => handleQuestionClick(e, question)}> {question.questionTitle} 
                            <br/>
                                <label id={`text_${question.questionID}`} className="question_text"  key={question.text} visibility={visibility ? "visible" : "hidden"}> {question.questionText} </label>
                                {question.tags.map((tag) => { 
                                    return (
                                    <>
                                        <button className="like_tag_button" key={tag}>      {tag}                                                           </button> 
                                        <label className="like_link_label">                 {tag !== question.tags[question.tags.length - 1] ? " | " : ""}  </label>
                                    </>)
                                })} </td>
                            { manageQuestions && <td className="question_update" key={question.lastUpdate}>      {question.lastUpdate}               </td> }
                            { manageQuestions && <td className="question_type"   key={question.type}>            {question.questionType}             </td> }

                            { manageQuestions && tests && tests.map((test) => {
                                <>
                                    { test.questions.map((testQuestion) => {
                                        // console.log("questionID - " + question.questionID);
                                        // console.log("questionTitle - " + question.questionName);
                                        // console.log("testID - " + test.testID);
                                        // console.log("testQuestionID - " + testQuestion.questionID);

                                        if (testQuestion.questionID === question.questionID) ++numOfTests;

                                        // console.log("numOfTests - " + numOfTests);
                                        // console.log("--------------------------------");

                                        return null;
                                    }) };
                                </>

                                return null;
                            })}                    

                            { manageQuestions && <td> { numOfTests } </td> }
                            { manageQuestions && <td key="hidden" style={{display: "none"}}> {  numOfTests = 0  } </td> }

                            <td className="buttons">
                                <button className="regular__button" onClick={(e) => handleShow(e, question.questionID)                          }>        Show   </button>
                                { handleEdit        && <button className="regular__button" onClick={() =>  handleEdit(question.questionID)      }>        Edit   </button> }
                                { handleDuplicate   && <button className="regular__button" onClick={() =>  handleDuplicate(question.questionID) }>   Duplicate   </button> }
                                { handleDelete      && <button className="regular__button" onClick={() =>  handleDelete(question.questionID)    }>      Delete   </button> }
                            </td>
                        </tr> ))}
                    </tbody>
                </table>
            </div>
            <div id="under_table__container">
            <label type="text" id="showing_questions"> showing 1-{filteredQuestions ? filteredQuestions.length : ""} of filtered Questions </label>
                { handleNext            && <button className="regular__button" onClick={() => handleNext()          }> Next {currentPage + 1} {`>>`}                                          </button> }
                { handleShowSelected    && <button className="regular__button" onClick={() => handleShowSelected()  }> Show Selected Only                                   </button> }
                { handleShowAll         && <button className="regular__button" onClick={() => handleShowAll()       }> Show All {questions && questions.length} questions   </button> }
            </div>
        </div>
    )
};
