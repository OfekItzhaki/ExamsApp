import React, { useEffect, useState         }   from 'react';
import        { QuestionTable               }   from '../../../../Admin/QuestionTable/QuestionTable';
import        { useHistory, useLocation     }   from 'react-router-dom';
import        { Filter                      }   from '../../../../Admin/Filter/Filter';
import        { fetchTests                  }   from '../../../../../services/tests';
import styles                                   from './ManageQuestions.css';

export default function ManageQuestions() {

    // ---------------------------- Fetch Info Hooks ---------------------------

    const [ questions,          setQuestions            ]  = useState(null);
    const [ tags,               setTags                 ]  = useState(null);

    const [ field,              setField                ]  = useState(null);
    const [ tests,              setTests                ]  = useState(null);

    // ----------------------------- Content Hooks -----------------------------    

    const [ filterStatus,       setFilterStatus         ]  = useState(false);
    const [ filterByTags,       setFilterByTags         ]  = useState(true);

    const [ filteredQuestions,  setFilteredQuestions    ]  = useState([]);

    // ----------------------------------------------------------------------------

    const location = useLocation();
    const history = useHistory();

    const handleDuplicate = () => {
        
    }

    const handleEdit = () => {

    }

    const handleShow = () => {

    }

    const handleDelete = (id) => {
        const newQuestions = questions.filter(question => question.id !== id);
        setQuestions(newQuestions);
    }
    
    const handleShowAll = () => {
        
    }
    
    const handleFilterByChange = (value) => {
        if (value === "tags") setFilterByTags(true);
        else setFilterByTags(false);
    }
    
    const handleBack = () => {
        history.goBack();
    }

    const handleNewQuestion = () => {
        history.push({
            pathname: "/admin/create-question",
            // search: '?update=true',  // query string
            state: {  // location state
                // update: true, 
              field: field,
              question: null
            },
        }); 
    }

    const handleFilterContentChange = (value) => {
        
        if (value === "") setFilterStatus(false);
        else setFilterStatus(true);

        let newQuestionList = questions;
        setFilteredQuestions(newQuestionList.filter((question) => { 
            
            let contains = false;

            if (filterByTags === true) {
                question.tags.map((tag) => {
                    if (tag.toLowerCase().includes(value)) contains = true;
                });
            } else {
                if (question.title.toLowerCase().includes(value)) contains = true;
            }

            if (contains === true) return question;
            else return null;

        }));
    }

    const fetchTests = () => {
        fetch("http://localhost:8000/tests", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => { 
          setTests(data); 
        })
        .catch((err) => console.log('error fetching tests:' + err))
    }

    const fetchTags = () => {
        fetch("http://localhost:8000/tags", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => { 
          setTags(data); 
        })
        .catch((err) => console.log('error fetching tags:' + err));
      }

    const fetchQuestions = () => {
        fetch("http://localhost:8000/questions", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
            setQuestions(data)
            setFilteredQuestions(data);
        })
        .catch((err) => console.log('error fetching questions:' + err));
      }

    // Meant for fetching the necessary information on first render
    useEffect(() => {
        document.title = "Manage Questions";

        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check 
            fetchQuestions();
            fetchTags();
            fetchTests();
        }

        if (location) {
            if (location.state.field) setField(location.state.field);
          }

        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    return (
        <div className="manage_questions noselect">
            <div id="headers__container">
                <h1 className="page__header"> Available Questions for {field ? field : ""} </h1>
            </div>

            { questions && filteredQuestions && <Filter filterStatus={filterStatus} totalAmount={questions.length} filteredAmount={filteredQuestions.length} 
                handleFilterByChange={handleFilterByChange} handleFilterContentChange={handleFilterContentChange}/> }

            { <QuestionTable manageQuestions={true} questions={filteredQuestions} filteredQuestions={filteredQuestions} tests={tests} handleShow={handleShow} 
                handleEdit={handleEdit} handleDuplicate={handleDuplicate} handleDelete={handleDelete} handleShowAll={handleShowAll} /> }

            <div id="buttons__container">
                <button className="regular__button" onClick={() =>   handleBack()          }>  {`<<` } Back         </button>
                <button className="regular__button" onClick={() =>   handleNewQuestion()   }>  New Question {`>>`}  </button>
            </div>

        </div>
    )
};