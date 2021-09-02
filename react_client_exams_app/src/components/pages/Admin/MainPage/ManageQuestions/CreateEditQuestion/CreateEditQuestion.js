import React, { useState, useEffect       }  from 'react';
import        { useHistory, useLocation   }  from 'react-router-dom';
import        { TagsInput                 }  from '../../../../../Admin/TagsInput/TagsInput';
import styles                                from './CreateEditQuestion.css';

  export default function CreateEditQuestion() {

  // ------------------------ Fetch Info Hooks -----------------------

  const [ questionTypes,        setQuestionTypes    ]  = useState(null);
  const [ questions,            setQuestions        ]  = useState(null);

  const [ question,             setQuestion         ]  = useState(null);
  const [ field,                setField            ]  = useState(null);

  // ------------------------- Content Hooks -------------------------

  // *Question Table*
  const [ questionID,           setQuestionID       ]  = useState(0);
  const [ questionType,         setQuestionType     ]  = useState("");
  const [ questionTitle,        setQuestionTitle    ]  = useState("");
  const [ questionText,         setQuestionText     ]  = useState("");
  const [ difficulty,           setDifficulty       ]  = useState("low");

  // *Answers Table*
  const [ answers,              setAnswers          ]  = useState(
    question ? question.answers : [
      { "answerID": 0, "answerTitle": "", "correct": true},
      { "answerID": 1, "answerTitle": "", "correct": false},
      { "answerID": 2, "answerTitle": "", "correct": false}
    ]
  );
  const [ answerID,             setAnswerID         ]  = useState(answers ? answers[answers.length - 1].answerID + 1 : 0);
  const [ answersLayout,        setAnswersLayout    ]  = useState("vertical");

  // *Tags Table* 
  const [ tags,                 setTags             ]  = useState(question ? question.tags : "");

  // -----------------------------------------------------------------

  const initialState = () => {
    console.log("returning to initial state");
    setQuestionType(questionTypes ? questionTypes[0] : "");
    setQuestionTitle("");
    setQuestionText("");
    setQuestionID(questionID + 1);

    setAnswers([
      { "answerID": 0, "answerTitle": "", "correct": true},
      { "answerID": 1, "answerTitle": "", "correct": false},
      { "answerID": 2, "answerTitle": "", "correct": false}
    ]);

    setAnswerID(answers ? answers[answers.length - 1].answerID + 1: 0);
    setTags("");
    setAnswersLayout("vertical");
  }
  
  const addAnswer = (event) => {  
    console.log("add answer");
    event.preventDefault();
    let newPossibleAnswers = answers;
    newPossibleAnswers.push({ "answerID": answers[answers.length - 1].answerID + 1, "answerTitle": "", correct: false });
    setAnswers(newPossibleAnswers);
    setAnswerID(answers[answers.length - 1].answerID + 1);
  }

  const removeAnswer = (event, id) => { 
    event.preventDefault(); 
    console.log("remove answer id " + id)
    setAnswers(answers.filter((answer) => answer.answerID !== id));
  }
  
  const location = useLocation();
  const history = useHistory();

  const back = () => {
      history.goBack();
  }

  const show = () => {
    
  }

  const handleTagsChange = newTags => {
    console.log(newTags);
    setTags(newTags);
  }

  const handlePossibleAnswersChange = () => {
    // console.log("possible answers changed")
    let correctAnswer_Counter = 0;
    (answers && answers.map((answer) => {
      let radio = document.getElementById(`radio_${answer.answerID}`);
      radio.checked = answer.correct;
      if (answer.correct === true) {
        correctAnswer_Counter++;
      }
    }));

    if (questionTypes) {
      if (correctAnswer_Counter === 0) {
        // console.log("0 correct answers")
      } else if (correctAnswer_Counter === 1) {
        setQuestionType(questionTypes[0].typeName);
        // console.log("1 correct answers")
      } else {
        setQuestionType(questionTypes[1].typeName)
        // console.log("2+ correct answers")
      }
    }
  }

  const handleAnswerClick = (id) => {
    console.log("handle answer click");
    let newAnswers = answers;
    let amountCorrect = newAnswers.filter((answer) => answer.correct === true)
    newAnswers.filter((answer) => answer.answerID === id).map((answer) => {

      if (amountCorrect.length <= 1) {
        if (answer.correct === false) answer.correct = true;
      }

      else if (amountCorrect.length > 1 && amountCorrect.length < newAnswers.length - 1) {
        answer.correct = !answer.correct;
        console.log(`answer_${id} state - ${answer.correct}`);
      }

      else {
        if (answer.correct === true) answer.correct = false;
      }

      return answer;
    });
    setAnswers(newAnswers);
    handlePossibleAnswersChange();
  }

  const handleLayoutChange = (e) => {
    if (e.target.checked === true) {
      setAnswersLayout(e.target.id);
    }
  }

  const handleAnswerChanged = (id, a) => {
    console.log("handle answer changed");
    let newPossibleAnswers = answers;
    newPossibleAnswers.filter((answer) => answer.answerID === id).map((answer) => {
      answer.answerTitle = a;
      return answer;
    });
    setAnswers(newPossibleAnswers);
  }

  const handleSubmit = (event) => {
    console.log("handle submit");
    event.preventDefault();
    saveQuestion();
  }

  const saveQuestion = () => {
    console.log(questionID);

    fetch('http://localhost:8000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: questionID,
        tags: tags,
        last_update: Date.now,
        type: questionType,
        title: questionTitle,
        text: questionText,
        difficulty: difficulty,
        answers: answers,
        answersLayout: answersLayout
      }),
    })
      .then((res) => res.json())
      .then((data) => { 
        console.log(data); 
        initialState(); 
      })
      .catch((err) => console.log(`error ${err}`));
  }

  const caseEditQuestion = () => {
    let editQuestion = location.state.question;

    setQuestionID(editQuestion.questionID);
    console.log(`Current questionID: ${editQuestion.questionID}`); 
    
    setQuestionType(editQuestion.questionType);
    setQuestionTitle(editQuestion.questionHeader);
    setQuestionText(editQuestion.questionText);
    setAnswers(editQuestion.answers);
    setAnswerID(editQuestion.answers[editQuestion.answers.length - 1].answerID + 1);
    setAnswersLayout(editQuestion.answersLayout);
    setTags(editQuestion.tags);
  }

  const fetchQuestions = () => {
    fetch("http://localhost:8000/questions", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setQuestions(data); 

      // Edit question
      if (location.state && location.state.question) caseEditQuestion();
      else {
        setQuestionID( data && data[data.length - 1].questionID + 1);
        console.log(`Current questionID: ${data[data.length - 1].questionID + 1}`); 
      }
    })
    .catch((err) => console.log('error fetching questions:' + err));
  }

  const fetchQuestionTypes = () => {
    fetch("http://localhost:8000/questionTypes", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setQuestionTypes(data); 
      setQuestionType(questionType ? questionType : data[0].typeName); 
    })
    .catch((err) => console.log('error fetching question types:' + err));
  }

  // Meant to set the type according to the amount of the correct answers
  useEffect(() => {
    handlePossibleAnswersChange();
  }, [answers])

  // Meant for setting the title of the document on the first render
  useEffect(() => {
    if (location.state && location.state.question) setQuestion(location.state.question);
    document.title = `${location.state.question === null ? "Create" : "Edit"} Question`;

    if (location.state) {
      if (location.state.field) setField(location.state.field);
    }

  }, [location])

  // Meant for fetching the necessary information on first render
  useEffect(() => {
    let isMounted = true;           // note mutable flag

    if (isMounted) {                // add conditional check
      fetchQuestions();
      fetchQuestionTypes();
    }

    // Event listener for enter key press inside form's inputs
    // const listener = event => {
    //   if (event.code === "Enter" || event.code === "NumpadEnter") {
    //     console.log("Enter key was pressed. Run your function.");
    //     handleSubmit(event);
    //   }
    // };
    // document.addEventListener("keydown", listener);

    // Prevent form submission on enter key press inside inputs
    const listener = e => {if(e.keyIdentifier==='U+000A'||e.keyIdentifier==='Enter'||e.keyCode===13){if(e.target.nodeName === 'INPUT' && e.target.type !== 'textarea'){e.preventDefault();return false;}}};
    document.addEventListener('keydown', listener, true);

    return () => { 
      document.removeEventListener("keydown", listener);
      isMounted = false
    }; // cleanup toggles value, if unmounted
  }, [])

  return (
    <div className="create_edit_question noselect">
      <h1 className="page__header"> { question === null ? "Create" : "Edit" } Question </h1>
      <form className="new_question__form" onSubmit={handleSubmit}>

        <div className="content__section">
          <table id="question__table">
            <tbody>
              <tr>
                <td> <label> Field: </label> </td>
                <td> <label id="field__label"> { field === null ? "undefined" : field } </label> </td>
              </tr>

              <tr>
                  <td> <label> Question type: </label> </td>
                  <td> <select id="question_type__select" value={questionType} disabled>
                          {questionTypes && questionTypes.map((questionType) => (
                            <option key={questionType.typeID} value={questionType.typeName}> {questionType.typeName} </option>
                          ))}
                        </select> </td>
              </tr>

              <tr>
                <td> <label> Question header: </label> </td>
                <td> <input className="asterisk_input" value={questionTitle} type="text" placeholder="Enter your question here"  onChange={(e) => setQuestionTitle(e.target.value)} required/> </td>
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

              {answers && answers.map((answer) => (
              <tr key={answer.answerID}>
                <td> { answer.answerID === 0 && <label> Possible answers: </label> } </td>
                <td className="answer__td"> 
                  <button type="" onClick={ (e) => removeAnswer(e, answer.answerID) }> X </button>
                  <input id={`answer_${answer.answerID}` } className="asterisk_input" name="answer" type="text" onChange={(e) => handleAnswerChanged(answer.answerID, e.target.value)} placeholder={`Answer #${answer.answerID}`} required/> 
                  <input id={`radio_${answer.answerID}`  } name={questionTypes ? (questionType === questionTypes[0] ? questionType : "") : "default"} type="radio" onClick={(e) => handleAnswerClick(answer.answerID)} /> 
                  <label id={`label_${answer.answerID}`  } htmlFor={`radio_${answer.answerID}`}   >  {answer.correct === true ? "Correct" : "Incorrect"}  </label>
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
                <td> <TagsInput tags={handleTagsChange}/> </td>
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