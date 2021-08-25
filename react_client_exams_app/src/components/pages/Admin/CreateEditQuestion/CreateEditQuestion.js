import React, { useState, useEffect } from 'react';
import        { Button }              from '../../../shared/Button/Button';
import styles                         from './CreateEditQuestion.css';


  export const CreateEditQuestion = ({
    children, 
    field, 
    question
  }) => {

  const [type,            setType]            = useState("");
  const [questionText,    setQuestionText]    = useState("");
  const [textBelow,       setTextBelow]       = useState("");

  const [possibleAnswers, setPossibleAnswers] = useState("");
  const [answersLayout,   setAnswersLayout]   = useState("");

  const [tags,            setTags]            = useState('');

  const handleAnswerClick = (id) => {
    console.log(id);
    let tempValue = document.getElementById(id).checked;
    console.log(document.getElementById(id).checked);
    // idk why it doesn't work:
    // document.getElementById(id).checked = !tempValue;
    // console.log(document.getElementById(id).checked);

    if (document.getElementById(id).className === "incorrect") {
      document.getElementById(id).className = "correct";
    } else {
      document.getElementById(id).className = "incorrect";
    }
  }

  // const [verticalChecked, setVerticalChecked] = useState(true);
  // const handleLayoutClick = () => setVerticalChecked(!verticalChecked);

  //    In jsx:
  //   onChange={handleLayoutClick} checked={verticalChecked}
  //   onChange={handleLayoutClick} checked={!verticalChecked}

  useEffect(() => {
    document.title = `${question === undefined ? "Create" : "Edit"} Question`;
  }, [])

  return (
    <div className="create_edit_question">
      <h1> {question === undefined ? "Create" : "Edit"} Question </h1>
      <form className="new_question__form">

        <div className="content__section">

          {/* Might not work, JUST FOR NOW !!! */}
          <table>
            <tr>
              <td>
                <label> Field: </label>
              </td>
              <td>
                <label id="field__label"> {field} </label>
              </td>
            </tr>

            <tr>
              <td>
                <label> Question type: </label>
              </td>
              <td>
                <select id="question_type__select">
                  <option className="question_type" value={type} onChange={(e) => setType (e.target.value)} > Single Answer Question    </option>
                  <option className="question_type" value={type} onChange={(e) => setType (e.target.value)} > Multiple Answer Question  </option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label> Question header: </label>
              </td>
              <td>
                <input id="question_header__input" type="text" placeholder="Enter your question here" value={questionText} onChange={(e) => setQuestionText (e.target.value)} />    
              </td>
            </tr>

            <tr>
              <td>
                <label> Question additional information: </label>
              </td>
              <td>
                <input id="quesiton_information__input" type="text" placeholder="Type something" value={textBelow} onChange={(e) => setTextBelow (e.target.value)} />
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
                  <input id="answer_1" type='text' placeholder='First answer'   value={questionText}  onChange={(e) => setQuestionText(e.target.value)} />
                  <input id="radio_1"  type="radio"    value="" onChange={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_1"   >  Incorrect  </label>
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
                  <input id="answer_2" type='text' placeholder='Second answer' value={questionText}  onChange={(e) => setQuestionText(e.target.value)} />
                  <input id="radio_2"  type="radio"    value="" onClick={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_2"   >  Incorrect  </label>
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
                  <input id="answer_3" type='text' placeholder='Third answer'   value={questionText}  onChange={(e) => setQuestionText(e.target.value)} />
                  <input id="radio_3"  type="radio"    value="" onClick={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_3"   >  Incorrect  </label>
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