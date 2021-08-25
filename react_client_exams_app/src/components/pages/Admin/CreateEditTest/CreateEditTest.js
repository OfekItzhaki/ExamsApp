import React, { useState, useEffect } from 'react';
import        { Button }              from '../../../shared/Button/Button';
import styles                         from './CreateEditTest.css';


export const CreateEditTest = ({
  children, 
  field, 
  test
}) => {

  const [language, setLanguage] = useState("English");

  useEffect(() => {
    document.title = `${test === undefined ? "Create" : "Edit"} Test`;
  }, [])

  return (
    <div className="create_edit_question">
      <h1> {test === undefined ? "Create" : "Edit"} Test </h1>
      <form className="new_question__form">
        
        <h2> General Test Details </h2>
        <div className="content__section">

          {/* Might not work, JUST FOR NOW !!! */}
          <table>
            <tr>
              <td>
                <label> Field of Study: </label>
              </td>
              <td>
                <label id="field__label"> {field} </label>
              </td>
            </tr>

            <tr>
              <td>
                <label> Language: </label>
              </td>
              <td>
                <select id="language__select">
                  <option className="question_type" value="English" onChange={(e) => setLanguage (e.target.value)}  > English  </option>
                  <option className="question_type" value="Hebrew" onChange={(e) => setLanguage (e.target.value)}   > Hebrew   </option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label> Question header: </label>
              </td>
              <td>
                {/* <input id="question_header__input" type="text" placeholder="Enter your question here" value={questionText} onChange={(e) => setQuestionText (e.target.value)} />     */}
              </td>
            </tr>

            <tr>
              <td>
                <label id="question_information__label" > Question additional information: </label>
              </td>
              <td>
                {/* <input id="quesiton_information__input" type="text" placeholder="Type something" value={textBelow} onChange={(e) => setTextBelow (e.target.value)} /> */}
              </td>
            </tr>
          </table>
        </div>


        {/* NEED TO THINK OF A WAY TO MAKE THE ANSWERS PART DYMANIC */}

        <div className="content__section">
          <table>
            <tr>
              <td>
                <label>  Possible answers: </label>
              </td>
              <td>
                <div className="answer__container">
                  <button onClick={removeAnswer()}> X </button>
                  {/* <input id="answer_1" type='text' placeholder='First answer'   value={questionText}  onChange={(e) => setQuestionText(e.target.value)} />
                  <input id="radio_1"  type="radio"    value="" onChange={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_1"   >  Incorrect  </label> */}
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <label></label>
              </td>
              <td>
                <div className="answer__container">
                  <button onClick={removeAnswer()}> X </button>
                  {/* <input id="answer_2" type='text' placeholder='Second answer' value={questionText}  onChange={(e) => setQuestionText(e.target.value)} />
                  <input id="radio_2"  type="radio"    value="" onClick={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_2"   >  Incorrect  </label> */}
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <label></label>
              </td>
              <td>
                <div className="answer__container">
                  <button onClick={removeAnswer()}> X </button>
                  {/* <input id="answer_3" type='text' placeholder='Third answer'   value={questionText}  onChange={(e) => setQuestionText(e.target.value)} />
                  <input id="radio_3"  type="radio"    value="" onClick={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_3"   >  Incorrect  </label> */}
                </div>
              </td>
            </tr>
          </table>

          <div className="answer_layout__container">
            <label name="layout__label"> Answers layout: </label>
            <input id="vertical"    type="radio"  name="answer_layout"  defaultChecked={true}  />    <label htmlFor="vertical"   >  Vertical   </label>
            <input id="horizontal"  type="radio"  name="answer_layout"                         />    <label htmlFor="horizontal" >  Horizontal </label>
            <button onClick={Add_Answer()}> Add an Answer </button>
          </div>
        </div>

        <div id="buttons__container">
          <button onClick={ Back() }> {`<<` } Back  </button>
          <button onClick={ Show() }>      Show     </button>
          <button onClick={ Save() }>  Save {`>>` } </button>
        </div>
      </form>
    </div>
  )
};

function Add_Answer() {
    // console.log("add answer");
}

function removeAnswer() {
  // console.log("remove answer");
}

function Back() {
  // window.location.href = history.back;
}

function Show() {
  // window.location.href = history.back;
}

function Save() {
  // window.location.href = history.back;
}