import React, { useState, useEffect     }  from 'react';
import        { useHistory, useLocation }  from 'react-router-dom';
import        { TagsInput               }  from '../../../../../Admin/TagsInput/TagsInput';
import styles                              from './CreateEditQuestion.css';

  export default function CreateEditQuestion() {

  // ------------------------ Fetch Info Hooks -----------------------

  const [ questionTypes,        setQuestionTypes    ]  = useState(null);
  const [ questions,            setQuestions        ]  = useState(null);

  const [ question,             setQuestion         ]  = useState(null);
  const [ field,                setField            ]  = useState(null);

  // ------------------------- Content Hooks -------------------------

  // *Question Table*
  // Need to change it to "location.state.question"
  const [ type,                 setType             ]  = useState(question ? question.type : "");
  const [ questionHeader,       setQuestionHeader   ]  = useState(question ? question.title : "");
  const [ questionText,         setQuestionText     ]  = useState(question ? question.text : "");
  const [ questionID,           setQuestionID       ]  = useState(question ? question.id + 1 : 0);

  // *Answers Table*
  const [ possibleAnswers,      setPossibleAnswers  ]  = useState(
    question ? question.answers : [
      { "id": 0, "answer": "", "correct": false},
      { "id": 1, "answer": "", "correct": false},
      { "id": 2, "answer": "", "correct": false}
    ]
  );
  const [ answerID,             setAnswerID         ]  = useState(possibleAnswers ? possibleAnswers[possibleAnswers.length - 1].id + 1 : 0);
  const [ answersLayout,        setAnswersLayout    ]  = useState("vertical");

  // *Tags Table* 
  const [ tags,                 setTags             ]  = useState(question ? question.tags : "");

  // -----------------------------------------------------------------

  const selectedTags = tags => console.log(tags);

  const initialState = () => {
    console.log("returning to initial state");
    setType(questionTypes ? questionTypes[0] : "");
    setQuestionHeader("");
    setQuestionText("");
    setQuestionID(questionID + 1);

    setPossibleAnswers([
      { "id": 0, "answer": "", "correct": false},
      { "id": 1, "answer": "", "correct": false},
      { "id": 2, "answer": "", "correct": false}
    ]);

    setAnswerID(possibleAnswers ? possibleAnswers[possibleAnswers.length - 1].id + 1: 0);
    setTags("");
    setAnswersLayout("horizontal");
  }
  
  const addAnswer = (event) => {  
    event.preventDefault();
    let newPossibleAnswers = possibleAnswers;
    newPossibleAnswers.push({ "id": answerID, "answer": "", correct: false });
    setPossibleAnswers(newPossibleAnswers);
    setAnswerID(answerID + 1);
  }

  const removeAnswer = (event, id) => { 
    event.preventDefault(); 
    console.log("remove answer id " + id)
    setPossibleAnswers(possibleAnswers.filter((answer) => answer.id !== id));
  }
  
  const history = useHistory();
  const back = () => {
      history.goBack();
  }

  const show = () => {
    
  }

  const handlePossibleAnswersChange = () => {
    // console.log("possible answers changed")
    let correctAnswer_Counter = 0;
    (possibleAnswers && possibleAnswers.map((answer) => {
      let radio = document.getElementById(`radio_${answer.id}`);
      radio.checked = answer.correct;
      if (answer.correct === true) {
        correctAnswer_Counter++;
      }
    }));

    if (correctAnswer_Counter === 0) {
      setType("");
      // console.log("0 correct answers")
    } else if (correctAnswer_Counter === 1) {
      setType(questionTypes[0].type);
      // console.log("1 correct answers")
    } else {
      setType(questionTypes[1].type)
      // console.log("2+ correct answers")
    }
  }

  const handleTagsChange = () => {
    
  }

  const handleAnswerClick = (id) => {
    console.log("handle answer click");
    let newPossibleAnswers = possibleAnswers;
    newPossibleAnswers.filter((answer) => answer.id === id).map((answer) => {
      answer.correct = !answer.correct;
      // console.log(`answer_${id} state - ${answer.correct}`);
      document.getElementById(`label_${id}`).text = answer.answer === "Correct" ? "Incorrect" : "Correct";
      return answer;
    });
    setPossibleAnswers(newPossibleAnswers);
    handlePossibleAnswersChange();
  }

  const handleLayoutChange = (e) => {
    if (e.target.checked === true) {
      setAnswersLayout(e.target.id);
    }
  }

  const handleAnswerChanged = (id, a) => {
    console.log("handle answer changed");
    let newPossibleAnswers = possibleAnswers;
    newPossibleAnswers.filter((answer) => answer.id === id).map((answer) => {
      answer.answer = a;
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
      console.log(`Current questionID: ${data[data.length - 1].id + 1}`); 
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

  // Meant to set the type according to the amount of the correct answers
  useEffect(() => {
    handlePossibleAnswersChange();
  }, [possibleAnswers])

  // Meant for setting the title of the document on the first render
  useEffect(() => {
    document.title = `${question === undefined ? "Create" : "Edit"} Question`;
  }, [question])

    // Meant for fetching the necessary information on first render
  useEffect(() => {
    let isMounted = true;           // note mutable flag

    if (isMounted) {                // add conditional check
      fetchQuestions();
      fetchQuestionTypes();
    }

    window.addEventListener('keydown',function(e){if(e.keyIdentifier==='U+000A'||e.keyIdentifier==='Enter'||e.keyCode===13){if(e.target.nodeName === 'INPUT' && e.target.type !== 'textarea'){e.preventDefault();return false;}}},true);

    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [])

  return (
    <div className="create_edit_question noselect">
      <h1 className="page__header"> { question === undefined ? "Create" : "Edit" } Question </h1>
      <form className="new_question__form" onSubmit={handleSubmit}>

        <div className="content__section">
          <table id="question__table">
            <tbody>
              <tr>
                <td> <label> Field: </label> </td>
                <td> <label id="field__label"> { field === undefined ? "undefined" : field } </label> </td>
              </tr>

              <tr>
                  <td> <label> Question type: </label> </td>
                  <td> <select id="question_type__select" value={type} disabled>
                          {questionTypes && questionTypes.map((questionType) => (
                            <option key={questionType.id} value={questionType.type}> {questionType.type} </option>
                          ))}
                        </select> </td>
              </tr>

              <tr>
                <td> <label> Question header: </label> </td>
                <td> <input className="asterisk_input" value={questionHeader} type="text" placeholder="Enter your question here"  onChange={(e) => setQuestionHeader(e.target.value)} required/> </td>
              </tr>

              <tr>
                <td> <label> Question additional information: </label> </td>
                <td> <input className="asterisk_input" value={questionText}   type="text" placeholder="Type something"            onChange={(e) => setQuestionText(e.target.value)}    required/> </td>
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
                <td className="answer__td"> 
                  <button type="" onClick={ (e) => removeAnswer(e, answer.id) }> X </button>
                  <input id={`answer_${answer.id}` } className="asterisk_input" name="answer" type="text" onChange={(e) => handleAnswerChanged(answer.id, e.target.value)} placeholder={`Answer #${answer.id}`} required/> 
                  <input id={`radio_${answer.id}`  } name={questionTypes ? (type === questionTypes[0] ? type : "") : "default"} type="radio" onClick={(e) => handleAnswerClick(answer.id)} /> 
                  <label id={`label_${answer.id}`  } htmlFor={`answer_${answer.id}`}   >  {answer.correct === true ? "Correct" : "Incorrect"}  </label>
                </td>
              </tr>
              ))}
            </tbody>
          </table>

          <div className="answer_layout__container">
            <label name="layout__label"> Answers layout: </label>
            <input id="vertical"    type="radio"  name="answer_layout"  defaultChecked onChange={(e) => handleLayoutChange(e)} />    <label htmlFor="vertical"   >  Vertical   </label>
            <input id="horizontal"  type="radio"  name="answer_layout"                 onChange={(e) => handleLayoutChange(e)} />    <label htmlFor="horizontal" >  Horizontal </label>
            <button onClick={(e) => addAnswer(e)}> Add an Answer </button>
          </div>
        </div>

        <div id="tags__container">
          <table id="tags__table">
            <tbody>
              <tr>
                <td> <label> Tags: </label> </td>
                <td> <TagsInput selectedTags={selectedTags} handleTagsChange={handleTagsChange}/> </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="buttons__container">
          <button className="regular__button" onClick={() => back() }> {`<<` } Back  </button>
          <button className="regular__button" onClick={() => show() }>  Show         </button>
          <button className="regular__button" type="submit"          >  Save {`>>` } </button>
        </div>
      </form>
    </div>
  )
};