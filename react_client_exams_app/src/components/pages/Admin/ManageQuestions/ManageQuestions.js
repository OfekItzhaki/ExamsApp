import React, { useEffect, useState }   from 'react';
import        { QuestionTable }      from '../../../Admin/QuestionTable/QuestionTable';
import        { useHistory }            from 'react-router-dom';
import styles                           from './ManageQuestions.css';

export const ManageQuestions = ({ field }) => {

    const [ questions,          setQuestions     ]  = useState(null);

    const [ filter,             setFilter        ]  = useState(false);
    const [ filterContent,      setFilterContent ]  = useState("");

    const history = useHistory();

    const Back = () => {
        history.goBack();
    }

    const New_Question = () => {
        // Open in the same window
        window.location.href = "/admin/create-question";
    }

    const handleDelete = (id) => {
        const newQuestions = questions.filter(question => questions.id !== id);
        setQuestions(newQuestions);
    }

    const fetchQuestions = () => {
        fetch("http://localhost:8000/questions", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.log('error fetching student tests:' + err))
      }

    useEffect(() => {
        document.title = "Manage Questions";

        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check 
            fetchQuestions();
        }

        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    useEffect(() => {
        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check 
            setFilter(filterContent === "" ? false : true)
        }

        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [filterContent])

    return (
        <div className="manage_questions noselect">
            <div id="headers__container">
                <h1 className="page__header"> Available Questions for </h1>
                <h1 id="field"> {field} </h1>
            </div>
            <div id="filter__container">
                <div id="filter_tags__container">    
                    <label> Filter by tags or content: </label>
                    <input id="filter__input" type="text"
                        value={filterContent}
                        onChange={(e) => { setFilterContent(e.target.value) } }
                        placeholder="Enter a list of keywords separated by commas"/>
                    <label id="filter__state"> Filter is {filter === false ? "OFF" : "ON"} </label>
                </div>
                <label id="amount__filtered"> Filtered {`AMOUNT`} of total {`AMOUNT`} </label>
            </div>
            <div id="table__container">
                {questions && <QuestionTable questions={questions} handleDelete={handleDelete} /> }
                <label type="text" id="showing_questions"> showing 1-{`AMOUNT`} of filtered Questions </label>
            </div>

            <div id="buttons__container">
                <button onClick={() =>   Back()          }>  {`<<` } Back         </button>
                <button onClick={() =>   New_Question()  }>  New Question {`>>`}  </button>
            </div>

        </div>
    )
};