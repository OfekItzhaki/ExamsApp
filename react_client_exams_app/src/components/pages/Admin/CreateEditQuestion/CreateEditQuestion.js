import React, { useState, useEffect } from 'react';
import        { Button }              from '../../../shared/Button/Button';

export default function CreateEditQuestion() {

  const [field, setField] = useState('');
  const [type, setType] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [textBelow, setTextBelow] = useState('');

  const [possibleAnswers, setPossibleAnswers] = useState('');
  const [answersLayout, setAnswersLayout] = useState('');

  const [tags, setTags] = useState('');

  useEffect(() => {
    document.title = "Login";
  }, [])

  return (
    <div className='create_edit_question'>
      <h1> {`${true}`} if create ? create : edit  {`<<---- change`} </h1>
      <form className='new_question__form'>
        <div className='content__section'>

          {/* Might not work, JUST FOR NOW !!! */}
          <select id='question_type'>
            <option value={type} onChange={(e) => setType(e.target.value)}> Single Answer Question    </option>
            <option value={type} onChange={(e) => setType(e.target.value)}> Multiple Answer Question  </option>
          </select>
          <input type='text' placeholder='Enter your question here' value={questionText}  onChange={(e) => setQuestionText  (e.target.value)} />
          <input type='text' placeholder='Type something'           value={textBelow}     onChange={(e) => setTextBelow     (e.target.value)} />












          <button onClick={Add_Answer()}></button>
        </div>
      </form>
    </div>
  )
};

function Add_Answer() {
    console.log("add answer");
}