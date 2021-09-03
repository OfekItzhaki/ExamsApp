import React, { useEffect, useState         }   from 'react';
import        { useHistory, useLocation     }   from 'react-router-dom';

export default function Test() {

    const [ studentTests,       setStudentTests     ] = useState(null);
    const [ questions,          setQuestions        ] = useState(null);
    
    const [ test,               setTest             ] = useState("");
    const [ studentID,          setStudentID        ] = useState("");
    const [ fullName,           setFullName         ] = useState("");
    
    const [ grade,              setGrade            ] = useState("");
    const [ status,             setStatus           ] = useState("");
    const [ summary,            setSummary          ] = useState("");
    
    const [ lastPage,           setLastPage         ] = useState(false);
    const [ questionID,         setQuestionID       ] = useState(0);
    const [ studentQuestions,   setStudentQuestions ] = useState([]);

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

    const handleQuestions = () => {

    }

    const handleSubmit = (event) => {
        console.log("handle submit");
        event.preventDefault();

        if (submitTest()) {

            history.push({
                pathname: `/student/review-test`,
                // search: '?update=true',  // query string
                state: {  // location state
                    // update: true, 
                    student: {
                        studentID: studentID,
                        fullName: fullName
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

        calcGrade();

        fetch('http://localhost:8000/studentTests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: studentTests[studentTests.length - 1].stID + 1,
                testID: test.testID,
                studentID: studentID,
                studentName: fullName,
                grade: grade,
                questions: studentQuestions,
                submitted: Date.now()
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

    const fetchStudentTests = () => {
        fetch("http://localhost:8000/studentTests", {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => setStudentTests(data))
            .catch((err) => console.log('error fetching student tests:' + err))
    }

    // Meant for fetching the necessary information on first render
    useEffect(() => {
        document.title = "State Test";

        if (location.state) {
            if (location.state.test) {
                setTest(location.state.test);

                if (location.state.test.questions) {
                    setStudentQuestions(location.state.test.questions);
                }
            }
            if (location.state.student) {
                setStudentID(location.state.studentID);
                setFullName(location.state.fullName);
            }
        }
    }, [])


    useEffect(() => {
        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check 
            fetchStudentTests();
            fetchQuestions();
        }

        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    useEffect(() => {
        if (questions) {
            studentTests.map((studentTest, i) => {
            // if (studentTest.questions[i].questionID === data[i].questionID) {
            //     if ()
            // } 
            })
        }

    }, [questions])

    return (
        <div className="test noselect">
            <label> Please complete the following form to begin: </label>
            <form id="test__form" onSubmit={handleSubmit}>
                <div id="test__container">
                    <div id="test_questions__container">

                    </div>

                    <div id="test_buttons__container">
                        <button id="previous_question" type="button" onClick={handleQuestions}> {`<<`} Previous Question </button>
                        <button id="next_question" type="button" onClick={handleQuestions} visibility={lastPage ? "hidden" : "visible"}> Next Question {`>>`}</button>
                        <button id="submit__button" type="submit" visibility={lastPage ? "visible" : "hidden"}> Submit </button>
                    </div>
                </div>
            </form>
        </div>
    )
};
