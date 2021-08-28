import React, { useState, useEffect } from 'react';
import        { Button }              from '../../../shared/Button/Button';
import        { useHistory }          from 'react-router-dom';
import        { TagsInput }           from '../../../Admin/TagsInput/TagsInput';
import styles                         from './CreateEditQuestion.css';

  export const CreateEditQuestion = ({ action, field, question }) => {

  // ------------------------- Content Hooks -------------------------

  const [questionTypes,       setQuestionTypes    ]  = useState(null);
  const [questions,           setQuestions        ]  = useState(null);

  // *Question Table*
  const [ type,               setType             ]  = useState(question ? question.type : "");
  const [ questionHeader,     setQuestionHeader   ]  = useState(question ? question.title : "");
  const [ questionText,       setQuestionText     ]  = useState(question ? question.text : "");
  const [ questionID,         setQuestionID       ]  = useState(question ? question.id + 1 : 0);

  // *Answers Table*
  const [ possibleAnswers,    setPossibleAnswers  ]  = useState([
    { "id": 0, "answer": "", "correct": false},
    { "id": 1, "answer": "", "correct": false},
    { "id": 2, "answer": "", "correct": false}
  ]);
  const [ answerID,           setAnswerID         ]  = useState(possibleAnswers ? possibleAnswers[possibleAnswers.length - 1].id + 1: 0);
  const [ answersLayout,      setAnswersLayout    ]  = useState("");

  // *Tags Table*
  const [ tags,               setTags             ]  = useState("");

  // -----------------------------------------------------------------

  const selectedTags = tags => console.log(tags);

  const initialState = () => {
    console.log("initial state");
    setType(questionTypes ? questionTypes[0] : "");
    setQuestionHeader("");
    setQuestionText("");
    setQuestionID(questionID + 1);

    let newPossibleAnswers = ([
      { "id": 0, "answer": "", "correct": false},
      { "id": 1, "answer": "", "correct": false},
      { "id": 2, "answer": "", "correct": false}
    ]);

    setPossibleAnswers(newPossibleAnswers);
    setAnswerID(newPossibleAnswers ? newPossibleAnswers[newPossibleAnswers.length - 1].id + 1: 0)
  }
  
  const addAnswer = () => {  
    let newPossibleAnswers = possibleAnswers;
    newPossibleAnswers.push({ "id": answerID, "answer": "", correct: false });
    setPossibleAnswers(newPossibleAnswers);
    setAnswerID(answerID + 1);
  }

  const removeAnswer = (id) => {  
    console.log("got to remove answer func")
    console.log("id " + id)
    let newPossibleAnswers = possibleAnswers;
    newPossibleAnswers.filter((answer) => answer.id !== id);
    setPossibleAnswers(newPossibleAnswers);
  }
  
  const history = useHistory();
  const back = () => {
      history.goBack();
  }

  const show = () => {
    
  }

  const handleAnswerClick = (id) => {
    console.log("handle answer click");
    let newPossibleAnswers = possibleAnswers;
    newPossibleAnswers.filter((answer) => answer.id === id).map((answer) => {
      console.log(answer.correct);
      answer.correct = !answer.correct;
      return answer;
    });
    setPossibleAnswers(newPossibleAnswers);

    console.log(type);
  }

  const handleLayoutChange = (e) => {
    if (e.target.checked === true) {
      setAnswersLayout(e.target.id);
    }
  }

  const handleTypeChange = (value) => {
    console.log("handle type changed");
    setType(value);
    console.log(value);

    let newAnswers = possibleAnswers;
    newAnswers.map((answer) => {
      answer.correct = false;
      return answer;
    });
    setPossibleAnswers(newAnswers);
  }

  const handleAnswerChanged = (id, a) => {
    console.log("handle answer changed");
    let newPossibleAnswers = possibleAnswers;
    newPossibleAnswers.filter((answer) => answer.id === id).map((answer) => {
      answer.answer = a;
      console.log(a);
      return answer;
    });
    setPossibleAnswers(newPossibleAnswers);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    saveQuestion();
  }

  const saveQuestion = () => {
    fetch('http://localhost:8000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: questionID,
        tags: tags,
        last_update: Date.now,
        type: type,
        title: questionHeader,
        text: questionText,
        difficulty: (question && question.difficulty ? question.difficulty : "low"),
        answers: possibleAnswers,
        num_of_tests: (question && question.num_of_tests ? question.num_of_tests : 0),
        answersLayout: answersLayout
      }),
    })
      .then((res) => res.json())
      .then((data) => { 
        console.log(data); 
        initialState(); 
      })
      .catch((err) => console.log(`error ${err}`))
  }

  const fetchQuestions = () => {
    fetch("http://localhost:8000/questions", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setQuestions(data); 
      setQuestionID(questionID ? questionID : data[data.length - 1].id + 1); 
      console.log(questionID); 
    })
    .catch((err) => console.log('error fetching questions:' + err))
  }

  const fetchQuestionTypes = () => {
    fetch("http://localhost:8000/questionTypes", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setQuestionTypes(data); 
      setType(type ? type : data[0].type); 
    })
    .catch((err) => console.log('error fetching question types:' + err))
  }

  useEffect(() => {
    document.title = `${action === undefined ? "Create" : "Edit"} Question`;
  }, [action])

  useEffect(() => {
    let isMounted = true;           // note mutable flag

    if (isMounted) {                // add conditional check
      fetchQuestions();
      fetchQuestionTypes();
    }

    possibleAnswers.map((answer) => (
      document.getElementById(`radio_${answer.id}`).checked = answer.correct
      // ,console.log(document.getElementById(`radio_${answer.id}`).checked)
    ))

    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [question, possibleAnswers])

  return (
    <div className="create_edit_question noselect">
      <h1 className="page__header"> { action === undefined ? "Create" : "Edit" } Question </h1>
      <form className="new_question__form" onSubmit={handleSubmit}>

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
                  <td> <select id="question_type__select" defaultValue={type} onChange={(e) => handleTypeChange(e.target.value)}>
                            {questionTypes && questionTypes.map((questionType) => (
                              <option key={questionType.id} value={questionType.type}> {questionType.type} </option>
                            ))}
                        </select> </td>
              </tr>

              <tr>
                <td> <label> Question header: </label> </td>
                <td> <input id="question_header__input"      value={questionHeader} type="text" placeholder="Enter your question here"  onChange={(e) => setQuestionHeader(e.target.value)} required/> </td>
              </tr>

              <tr>
                <td> <label> Question additional information: </label> </td>
                <td> <input id="question_information__input" value={questionText}   type="text" placeholder="Type something"            onChange={(e) => setQuestionText(e.target.value)}    required/> </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="content__section">
          <table id="answers__table">
            <tbody>

              {possibleAnswers && possibleAnswers.map((answer) => (
              <tr key={answer.id}>
                <td> { answer.id === 0 && <label> Possible answers: </label> } </td>
                <td> <button  onClick={() => removeAnswer(answer.id)} > X </button> </td>
                <td> <input   id={`answer_${answer.id}` } name="answer" type="text" onChange={(e) => handleAnswerChanged(answer.id, e.target.value)} placeholder={`Answer #${answer.id}`} required/> </td>
                <td> <input   id={`radio_${answer.id}`  } name={questionTypes ? (type === questionTypes[0] ? type : "") : "default"} type="radio" checked={answer.correct} onChange={(e) => handleAnswerClick(answer.id)} /> <label htmlFor={`answer_${answer.id}`}   >  Incorrect  </label> </td>
              </tr>
              ))}
            </tbody>
          </table>

          <div className="answer_layout__container">
            <label name="layout__label"> Answers layout: </label>
            <input id="vertical"    type="radio"  name="answer_layout"  defaultChecked onChange={(e) => handleLayoutChange(e)} />    <label htmlFor="vertical"   >  Vertical   </label>
            <input id="horizontal"  type="radio"  name="answer_layout"                 onChange={(e) => handleLayoutChange(e)} />    <label htmlFor="horizontal" >  Horizontal </label>
            <button onClick={() => addAnswer()}> Add an Answer </button>
          </div>
        </div>

        <div id="tags__container">
          <table id="tags__table">
            <tbody>
              <tr>
                <td> <label> Tags: </label> </td>
                {/* <input id="tags__input" type="text" placeholder="Enter tags"/> */}
                <td> <TagsInput selectedTags={selectedTags}/> </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="buttons__container">
          <button onClick={() => back() }> {`<<` } Back  </button>
          <button onClick={() => show() }>  Show         </button>
          <button type="submit"          >  Save {`>>` } </button>
        </div>
      </form>
    </div>
  )
};