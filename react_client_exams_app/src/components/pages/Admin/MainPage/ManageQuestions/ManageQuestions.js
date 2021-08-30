import React, { useEffect, useState }   from 'react';
import        { QuestionTable }      from '../../../../Admin/QuestionTable/QuestionTable';
import        { useHistory }            from 'react-router-dom';
import styles                           from './ManageQuestions.css';

export const ManageQuestions = ({ field }) => {

    // ---------------------------- Fetch Info Hooks ---------------------------

    const [ questions,          setQuestions     ]  = useState(null);
    const [ tags,               setTags          ]  = useState(null);

    // ----------------------------- Content Hooks -----------------------------    

    const [ filter,             setFilter        ]  = useState(false);
    const [ filterByTags,       setFilterByTags  ]  = useState(true);

    const [ filteredQuestions,  setFilteredQuestions  ] = useState([]);

    // ----------------------------------------------------------------------------

    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    const newQuestion = () => {
        history.push("/admin/create-question");
    }

    const next = () => {
        
    }

    const handleDelete = (id) => {
        const newQuestions = questions.filter(question => questions.id !== id);
        setQuestions(newQuestions);
    }

    const handleFilterByChange = (value) => {
        if (value === "tags") setFilterByTags(true);
        else setFilterByTags(false);
    }

    const handleFilterContentChange = (value) => {
        
        if (value === "") setFilter(false);
        else setFilter(true);

        let newQuestionList = questions;
        setFilteredQuestions(newQuestionList.filter((question) => { 
            
            let contains = false;

            if (filterByTags === true) {
                question.tags.map((tag) => {
                    if (tag.toLowerCase().includes(value)) contains = true;
                });
            } else {
                if (question.title.includes(value)) contains = true;
            }

            if (contains === true) return question;

        }));
    }

    const fetchTags = () => {
        fetch("http://localhost:8000/tags", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => { 
          setTags(data); 
        })
        .catch((err) => console.log('error fetching tags:' + err))
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
        .catch((err) => console.log('error fetching questions:' + err))
      }

    // Meant for fetching the necessary information on first render
    useEffect(() => {
        document.title = "Manage Questions";

        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check 
            fetchQuestions();
            fetchTags();
        }

        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    return (
        <div className="manage_questions noselect">
            <div id="headers__container">
                <h1 className="page__header"> Available Questions for {field ? field : ""} </h1>
            </div>
            <div id="filter__container">
                <label> Filter by: </label>
                <select onChange={ (e) => handleFilterByChange(e.target.value) }>
                    <option value="tags">       tags       </option>
                    <option value="content">    content    </option>
                </select>

                <div id="filter_by__container">
                    <input id="filter__input" type="text" onChange={ (e) => handleFilterContentChange(e.target.value) } placeholder="Enter a list of keywords separated by commas"/>
                    <label id="filter__state">      Filter is   {filter === false ? "OFF" : "ON"}                                                           </label>
                    <label id="amount__filtered">   Filtered    {filteredQuestions && filteredQuestions.length} of total {questions && questions.length}    </label>
                </div>
            </div>
            <div id="questions__container">
                <div id="table__container">
                    {questions && <QuestionTable questions={filteredQuestions} tags={tags} handleDelete={handleDelete} /> }
                </div>
                <div id="under_table__container">
                    <label type="text" id="showing_questions"> showing 1-{`AMOUNT`} of filtered Questions </label>
                    <button className="regular__button" onClick={() =>   next()          }> Next {`>>`} </button>
                    <button className="regular__button" onClick={() =>   next()          }> Show All {questions && questions.length} questions </button>
                </div>
            </div>

            <div id="buttons__container">
                <button className="regular__button" onClick={() =>   back()          }>  {`<<` } Back         </button>
                <button className="regular__button" onClick={() =>   newQuestion()   }>  New Question {`>>`}  </button>
            </div>

        </div>
    )
};