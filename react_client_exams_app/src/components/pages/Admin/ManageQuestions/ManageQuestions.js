import React, { useEffect, useState }   from 'react';
import        { QuestionTableRow }      from '../../../Admin/QuestionTableRow/QuestionTableRow';
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

    useEffect(() => {
        document.title = "Manage Questions";
        fetch("http://localhost:8000/questions")
        .then(res => {
            return res.json();
        })
        .then((data) => {
        //    console.log(data); 
           setQuestions(data);
        });
    }, [])

    return (
        <div className="manage_questions noselect">
            <div id="headers__container">
                <h1> Available Questions for </h1>
                <h1 id="field"> {field} </h1>
            </div>
            <div id="filter__container">
                <div id="filter_tags__container">    
                    <label> Filter by tags or content: </label>
                    <input id="filter__input" type="text"
                        value={filterContent}
                        onChange={(e) => { setFilterContent(e.target.value); filterContent === "" ? setFilter(false) : setFilter(true)} }
                        placeholder="Enter a list of keywords separated by commas"/>
                    <label id="filter__state"> Filter is {filter === false ? "OFF" : "ON"} </label>
                </div>
                <label id="amount__filtered"> Filtered {`AMOUNT`} of total {`AMOUNT`} </label>
            </div>
            <div id="table__container">
                <table id="questions__table">
                    <tbody>
                        <tr>
                            <th> ID </th>
                            <th> Question Text and Tags </th>
                            <th> Last Update </th>
                            <th> Question Type </th>
                            <th> # of Tests </th>
                            <th>  </th>
                        </tr>

                        {questions && <QuestionTableRow questions={questions} handleDelete={handleDelete} /> }
                    </tbody>
                </table>
                
                <label type="text" id="showing_questions"> showing 1-{`AMOUNT`} of filtered Questions </label>
            </div>

            <div id="buttons__container">
                <button onClick={() =>   Back()          }>  {`<<` } Back         </button>
                <button onClick={() =>   New_Question()  }>  New Question {`>>`}  </button>
            </div>

        </div>
    )
};