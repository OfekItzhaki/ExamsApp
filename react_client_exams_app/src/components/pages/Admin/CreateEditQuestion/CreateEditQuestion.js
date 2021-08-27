import React, { useState, useEffect } from 'react';
import        { Button }              from '../../../shared/Button/Button';
import        { useHistory }          from 'react-router-dom';
import styles                         from './CreateEditQuestion.css';


  export const CreateEditQuestion = ({ action, field }) => {

  // ------------------------- Content Hooks -------------------------

  // *Question Table*
  const [ type,            setType           ]  = useState("");
  const [ questionText,    setQuestionText   ]  = useState("");
  const [ textBelow,       setTextBelow      ]  = useState("");

  // *Answers Table*
  const [ possibleAnswers, setPossibleAnswers]  = useState("");
  const [ answersLayout,   setAnswersLayout  ]  = useState("");

  // *Tags Table*
  const [ tags,            setTags           ]  = useState("");

  // -----------------------------------------------------------------

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

  const history = useHistory();
  const Back = () => {
      history.goBack();
  }

  const Show = () => {
    
  }

  const Save = () => {  
    
  }

  const RemoveAnswer = (id) => {  

  }

  const AddAnswer = () => {  

  }

  // const [verticalChecked, setVerticalChecked] = useState(true);
  // const handleLayoutClick = () => setVerticalChecked(!verticalChecked);

  //    In jsx:
  //   onChange={handleLayoutClick} checked={verticalChecked}
  //   onChange={handleLayoutClick} checked={!verticalChecked}

  useEffect(() => {
    document.title = `${action === undefined ? "Create" : "Edit"} Question`;
  }, [action])

  return (
    <div className="create_edit_question">
      <h1 className="page__header"> { action === undefined ? "Create" : "Edit" } Question </h1>
      <form className="new_question__form">

        <div className="content__section">

          {/* Might not work, JUST FOR NOW !!! */}
          <table id="question__table">
            <tbody>
              <tr>
                <td> <label> Field: </label> </td>
                <td> <label id="field__label"> { field === undefined ? "undefined" : field } </label> </td>
              </tr>

              <tr>
                  <td> <label> Question type: </label> </td>
                  <td> <select id="question_type__select">
                          <option value={type} onChange={(e) => setType (e.target.value)} > Single Answer Question    </option>
                          <option value={type} onChange={(e) => setType (e.target.value)} > Multiple Answer Question  </option>
                        </select> </td>
              </tr>

              <tr>
                <td> <label> Question header: </label> </td>
                <td> <input id="question_header__input"       type="text" placeholder="Enter your question here" value={questionText} onChange={(e) => setQuestionText(e.target.value)} /> </td>
              </tr>

              <tr>
                <td> <label> Question additional information: </label> </td>
                <td> <input id="question_information__input"  type="text" placeholder="Type something"            value={textBelow} onChange={(e)   => setTextBelow(e.target.value)}    /> </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="content__section">
          <table id="answers__table">
            <tbody>
              <tr>
                <td> <label>  Possible answers: </label> </td>
                <td> <button  onClick={() => RemoveAnswer()} > X </button> </td>
                <td> <input   id="answer_1" type='text'      placeholder='First answer'                                 />    </td>
                <td> <input   id="radio_1"  type="radio"     value="" onClick={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_1"   >  Incorrect  </label> </td>
              </tr>

              <tr>
                <td></td>
                <td> <button  onClick={() => RemoveAnswer()} > X </button> </td>
                <td> <input   id="answer_2" type='text'      placeholder='Second answer'                                />    </td>
                <td> <input   id="radio_2"  type="radio"     value="" onClick={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_2"   >  Incorrect  </label> </td>
              </tr>

              <tr>
                <td> </td>
                <td> <button  onClick={() => RemoveAnswer()} > X </button> </td>
                <td> <input   id="answer_3" type='text'      placeholder='Third answer'                                />    </td>
                <td> <input   id="radio_3"  type="radio"     value="" onClick={(e) => handleAnswerClick(e.target.id)}   />    <label htmlFor="answer_3"   >  Incorrect  </label> </td>
              </tr>
            </tbody>
          </table>

          <div className="answer_layout__container">
            <label name="layout__label"> Answers layout: </label>
            <input id="vertical"    type="radio"  name="answer_layout"  defaultChecked  />    <label htmlFor="vertical"   >  Vertical   </label>
            <input id="horizontal"  type="radio"  name="answer_layout"                  />    <label htmlFor="horizontal" >  Horizontal </label>
            <button onClick={() => AddAnswer()}> Add an Answer </button>
          </div>
        </div>

        <div id="tags__container">
          <table id="tags__table">
            <tbody>
              <tr>
                <td> <label> Tags: </label> </td>
                <td> <input id="tags__input" type="text" placeholder="Enter tags"/> </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="buttons__container">
          <button onClick={() => Back() }> {`<<` } Back  </button>
          <button onClick={() => Show() }>  Show         </button>
          <button onClick={() => Save() }>  Save {`>>` } </button>
        </div>
      </form>
    </div>
  )
};