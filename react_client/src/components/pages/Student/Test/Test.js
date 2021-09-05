import React, { useEffect, useState         }   from 'react';
import        { useHistory, useLocation     }   from 'react-router-dom';

export const Test = (props) => {

    const [ studentTests,       setStudentTests     ] = useState(null);
    const [ questions,          setQuestions        ] = useState(null);
    const [ questionTypes,      setQuestionTypes    ] = useState(null);
    
    const [ test,               setTest             ] = useState("");
    const [ studentID,          setStudentID        ] = useState("");
    const [ fullName,           setFullName         ] = useState("");
    const [ email,              setEmail            ] = useState("");
    
    const [ grade,              setGrade            ] = useState("");
    const [ status,             setStatus           ] = useState("");
    const [ summary,            setSummary          ] = useState("");

    const [ currentIndex,       setCurrentIndex     ] = useState(0);
    const [ studentQuestions,   setStudentQuestions ] = useState([]);
    const [ questionsInfo,      setQuestionsInfo    ] = useState([]);

    const [ allBeenAnswered,    setAllBeenAnswered  ] = useState(false);

    const location = useLocation();
    const history = useHistory();

    const calcGrade = () => {
        let grade = 0;
        let numCorrectly = 0;

        questions.map((question) => {
            studentQuestions.map((studentQuestion) => {
                if (question.questionID === studentQuestion.questionID) {

                    question.answers.map((answer) => {
                        studentQuestion.answers.map((studentAnswer) => {
                            if (answer.answerID === studentAnswer.answerID && answer.answerTitle === studentAnswer.answerTitle) {

                                console.log("answer is correct");
                                numCorrectly++;
                            }
                        })
                    })
                }
            })
        })

        grade = Math.round((questions.length / numCorrectly) * 100);
        setGrade(grade);

        if (grade >= test.passingGrade) setStatus("Passed");
        else setStatus("Failed");

        if (numCorrectly > 0) setSummary(`You answered ${numCorrectly} questions correctly, out of ${questions.length} questions in total.`);
        else setSummary(`Out of ${questions.length} questions, You answered ${numCorrectly} correctly..`);
    }

    const handleQuickNav = (event, value) => {
        event.preventDefault();

        setCurrentIndex(value++);
    }

    const handleQuestions = (event, value) => {
        event.preventDefault();
        let lowerCase = value.toString().toLowerCase();
        if (lowerCase.includes("next")) {
            if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
        } else if (lowerCase.includes("previous")) {
            if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
        }
    }

    const handleSubmit = (event) => {
        console.log("handle submit");
        event.preventDefault();

        if (submitTest()) {

            history.push({
                pathname: `/student/after-submit/`,
                // search: '?update=true',  // query string
                state: {  // location state
                    // update: true, 
                    student: {
                        studentID: studentID,
                        fullName: fullName,
                        email: email
                    },
                    grade: grade,
                    status: status,
                    summary: summary,
                    passingGrade: test.passingGrade,
                    questions: studentQuestions
                },
            });
        }
    }

    const submitTest = () => {
        console.log(test.testID);
        console.log(allBeenAnswered)

        if (allBeenAnswered) {
            calcGrade();
            let today = new Date();
            let date = today.getFullYear() + '-' +(today.getMonth()+1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
    
            fetch('http://localhost:8000/studentTests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    testID: test.testID,
                    studentID: studentID,
                    studentName: fullName,
                    grade: grade,
                    questions: studentQuestions,
                    submitted: dateTime
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    return true;
                })
                .catch((err) => {
                    console.log(`error ${err}`)
                    return false;
                });
        }

        return false;
    }

    const handleAnswerClick = (qID, aID) => {
        console.log("handle answer click");
        let stQ = studentQuestions;
        // let amountCorrect = newAnswers.filter((answer) => answer.correct === true)
        stQ.map((question) => {
            if (question.id === qID) {
                stQ.questionAnswers.map((answer) => {
                //   if ()  
                })
            }

        })
    
        //   if (amountCorrect.length <= 1) {
        //     if (answer.correct === false) answer.correct = true;
        //   }
    
        //   else if (amountCorrect.length > 1 && amountCorrect.length < newAnswers.length - 1) {
        //     answer.correct = !answer.correct;
        //     console.log(`answer_${id} state - ${answer.correct}`);
        //   }
    
        //   else {
        //     if (answer.correct === true) answer.correct = false;
        //   }
    
    //       return answer;
    //     });
    //     setAnswers(newAnswers);
    //     handlePossibleAnswersChange();

    //     let temp = document.getElementById(`radio_${id}`).checked;
    //     console.log(temp);
    //     if (document.getElementById(`radio_${id}`).checked) {
    //         document.getElementById(`radio_${id}`).unchecked = true;
    //     }
    //     else {
    //         document.getElementById(`radio_${id}`).checked = true;
    //     }
    //     console.log(temp);
      }

    const fetchQuestions = () => {
        fetch("http://localhost:8000/questions", {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
            setQuestions(data);
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
        })
        .catch((err) => console.log('error fetching question types:' + err));
    }

    // Meant for fetching the necessary information on first render
    useEffect(() => {
        document.title = "State Test";

        if (location.state) {
            
            if (location.state.test) {
                setTest(location.state.test);

                if (location.state.test.questions) {
                    let stQ = [];
                    let qInfo = [];

                    if (questions) {
                        location.state.test.questions.map((testQuestion) => {
                            return (
                                questions.map((question) => {
                                    if (question.id === testQuestion.id) {
                                        stQ.push({
                                            "questionID": question.id,
                                            "questionAnswers": []
                                        });

                                        qInfo.push({
                                            "questionID": question.id,
                                            "questionTitle": question.questionTitle,
                                            "questionText": question.questionText,
                                            "questionType": question.questionType,
                                            "questionAnswers": question.questionAnswers.map((answer) => {
                                                return({
                                                    "answerID": answer.id,
                                                    "answerTitle": answer.answerTitle
                                                })
                                            })
                                            // ,
                                            // "chosenAnswers": []
                                        });
                                    }
                                })
                            )
                        })
                    }

                    setStudentQuestions(stQ);
                    setQuestionsInfo(qInfo);
                }
            }

            if (location.state.student) {
                setStudentID(location.state.id);
                setFullName(location.state.fullName);
                setEmail(location.state.email);
            }
        } else {
            history.push("/error404");
        }

    }, [questions])


    useEffect(() => {
        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check 
            fetchQuestions();
            fetchQuestionTypes();
        }

        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    return (
        <div className="test noselect">
            { test && <div id="test_form__container">
                <label> Please complete the following form to begin: </label>
                <form id="test__form" onSubmit={handleSubmit}>
                    <div id="test__container">
                        <div id="test_questions__container">

                            { questionsInfo && questionTypes && questionsInfo[currentIndex] && <>
                                    <h1 key={questionsInfo[currentIndex].questionID}> {questionsInfo[currentIndex].questionTitle} </h1>
    
                                    { questionsInfo[currentIndex].questionAnswers.map((answer) => {
    
                                        return (
                                            <div id="answers__container">
                                                <input id={`radio_${answer.id}`} name={questionsInfo[currentIndex].questionType ? (questionsInfo[currentIndex].questionType === questionTypes[1] ? questionsInfo[currentIndex].questionType : "") : ""} 
                                                    type="radio" onClick={(e) => handleAnswerClick(questionsInfo[currentIndex].questionID, answer.id)} /> 
                                                <label id={`label_${answer.id}`  } htmlFor={`radio_${answer.id}`}   >  {answer.answerTitle}  </label>
                                            </div> )
                                    })}
                            </> }

                            <div id="test_buttons__container">
                                { currentIndex > 0 && <button id="previous_question" type="button" onClick={(e) => handleQuestions(e, e.target.id)}> {`<<`} Previous Question </button> }
                                { studentQuestions && currentIndex < studentQuestions.length - 1 && <button id="next_question" type="button" onClick={(e) => handleQuestions(e, e.target.id)}> Next Question {`>>`}</button> }
                                { studentQuestions && currentIndex === studentQuestions.length - 1 && <button id="submit_button" type="submit"> Submit </button> }
                            </div>
                        </div>

                        { studentQuestions && <div id="quick_navigation__container">
                            <label> Quick Navigation: </label>
                            { studentQuestions.map((question) => {
                                return (
                                    <button id={question.id} className="navigation_button" onClick={(e) => handleQuickNav(e, e.target.id)}> {question.id + 1} </button>
                                )
                            })}
                        </div> }
                    </div>
                </form>
            </div> }
        </div>
    )
};


export default Test;
