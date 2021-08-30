import React, { useState, useEffect }           from 'react';
import        { Button }                        from '../../../../../shared/Button/Button';
import        { HashLink as Link }              from 'react-router-hash-link';
import        { useHistory, useLocation }       from 'react-router-dom';
import styles                                   from './CreateEditTest.css';

export const CreateEditTest = () => {

  // -------------------------------------------- Fetch Info Hooks --------------------------------------------

  const [ field,                      setField                  ] = useState(null);
  const [ test,                       setTest                   ] = useState(null);

  const [ testTypes,                  setTestTypes              ] = useState(null);
  const [ certificateTemplates,       setCertificateTemplates   ] = useState(null);
  const [ languages,                  setLanguages              ] = useState(null);

  // -------------------------------------------- Top Content Hooks -------------------------------------------

  // *General Details Table*
  const [ language,                   setLanguage               ] = useState(test ? test.language : "");
  const [ testType,                   setTestType               ] = useState(test ? test.testType : "");
  const [ testName,                   setTestName               ] = useState(test ? test.testName : "");
  const [ passingGrade,               setPassingGrade           ] = useState(test ? test.passingGrade : "");
  const [ header,                     setHeader                 ] = useState(test ? test.header : "");
  const [ messageSuccess,             setMessageSuccess         ] = useState(test ? test.messageSuccess : "");
  const [ messageFailure,             setMessageFailure         ] = useState(test ? test.messageFailure : "");
  const [ certificateTemplate,        setCertificateTemplate    ] = useState(test ? test.certificateTemplate : "");

  // *Email Delivery Table*         
  // Status Container          
  const [ status,                     setStatus                 ] = useState("OFF");
  const [ from,                       setFrom                   ] = useState(test ? test.from : "");
  const [ cc,                         setCC                     ] = useState(test ? test.cc : "");
  const [ bcc,                        setBCC                    ] = useState(test ? test.bcc : "");    

  // Passing the Test Container
  const [ passingMessageSubject,      setPassingMessageSubject  ] = useState(test ? test.passingSubject : "");
  const [ passingMessageBody,         setPassingMessageBody     ] = useState(test ? test.passingBody : "");    

  // Failing the Test Container
  const [ failingMessageSubject,      setFailingMessageSubject  ] = useState(test ? test.failingSubject : "");   
  const [ failingMessageBody,         setFailingMessageBody     ] = useState(test ? test.failingBody : "");    

  // -------------------------------------------- Bottom Content Hooks ----------------------------------------

  // *Filter Container*
  const [ filter,                     setFilter                 ] = useState(false);
  const [ filterContent,              setFilterContent          ] = useState("");

  // *Questions Table
  const [ questionsAmount,            setQuestionsAmount        ] = useState(test ? test.questionAmount : 0);    

  // ----------------------------------------------------------------------------------------------------------

  const location = useLocation();
  const history = useHistory();
  
  const back = () => {
    history.goBack();
  }
  
  const show = () => {
    
  }
  
  const handleStatus = (value) => {
    if (value === "") setStatus("OFF");
    else setStatus("ON");
  }

  const handleSubmit = (event) => {  
    event.preventDefault();
  }

  const saveTest = () => {
    fetch('http://localhost:8000/tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        // id: questionID,
        // tags: tags,
        // last_update: Date.now,
        // type: type,
        // title: questionHeader,
        // text: questionText,
        // difficulty: (question && question.difficulty ? question.difficulty : "low"),
        // answers: possibleAnswers,
        // num_of_tests: (question && question.num_of_tests ? question.num_of_tests : 0),
        // answersLayout: answersLayout
      }),
    })
      .then((res) => res.json())
      .then((data) => { 
        console.log(data); 
        // initialState(); 
      })
      .catch((err) => console.log(`error ${err}`))
  }

  const fetchLanguages = () => {
    fetch("http://localhost:8000/languages", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setLanguages(data); 
      setLanguage(language ? language : data[0].type); 
    })
    .catch((err) => console.log('error fetching languages:' + err))
  }

  const fetchTestTypes = () => {
    fetch("http://localhost:8000/testTypes", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setTestTypes(data); 
      setTestType(testType ? testType : data[0].type); 
    })
    .catch((err) => console.log('error fetching test types:' + err))
  }

  const fetchCertificateTemplates = () => {
    fetch("http://localhost:8000/certificateTemplates", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setCertificateTemplates(data); 
      setCertificateTemplate(certificateTemplate ? certificateTemplate : data[0].template); 
    })
    .catch((err) => console.log('error fetching certificate templates:' + err))
  }

  useEffect(() => {
    document.title = `${test === undefined ? "Create" : "Edit"} Test`;
  }, [test])

    // Meant for fetching the necessary information on first render
  useEffect(() => {
    let isMounted = true;           // note mutable flag

    if (isMounted) {                // add conditional check
      fetchLanguages();
      fetchTestTypes();
      fetchCertificateTemplates();
    }

    console.log(location ? location.state.field : "")  // for location state

    setField(location ? location.state.field : "");
    setTest(location ? location.state.test : "")

    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [])

  return (
    <div className="create_edit_test noselect">
      <h1 className="page__header"> {test === undefined ? "Create" : "Edit"} Test </h1> {/* className="page__header" */}
      <form className="new_test__form" onSubmit={handleSubmit}>
        <div id="top_content__container">
          
          <div className="content__section">
            <table id="general_details__table">
              <tbody>
                <tr className="space_under header_row border_bottom">
                  <th colspan="2"> General Test Details </th>
                </tr>
                <tr>
                  <td> <label> Field of Study: </label> </td>
                  <td> <label id="field__label"> {field ? field : "undefined"} </label> </td>
                </tr>

                <tr>
                  <td> <label> Language: </label> </td>
                  <td>  <select id="language__select" onChange={(e) => setLanguage (e.target.value)}>
                          {languages && languages.map((language) => (
                            <option key={language.id} value={language.name}> {language.name} </option>
                          ))} 
                        </select> </td>
                </tr>

                <tr>
                  <td> <label> Test Type: </label> </td>
                  <td> <select id="test_type__select" onChange={(e) => setTestType (e.target.value)}>
                          {testTypes && testTypes.map((testType) => (
                            <option key={testType.id} value={testType.type}> {testType.type} </option>
                          ))}
                        </select> </td>
                </tr>
                
                <tr>
                  <td> <label> Test Name:                                                                                                                                                  </label> </td>
                  <td> <input id="test_name__input"       type="text"     placeholder="test something"      value={testName}        onChange={(e) => setTestName     (e.target.value)}   required/> </td>
                </tr>

                <tr>
                  <td> <label> Passing Grade:                                                                                                                                              </label> </td>
                  <td> <input id="passing_grade__input"   type="text"     placeholder="Grade"               value={passingGrade}    onChange={(e) => setPassingGrade (e.target.value)}   required/> </td>
                </tr>

                <tr>
                  <td> <label> Show correct answers after submission:                                                                                                                      </label> </td>
                  <td> <input id="show_answers__checkbox" type="checkbox" defaultChecked                                                                                                 required/> </td>
                </tr>

                <tr>
                  <td> <label> Message header:                                                                                                                                             </label> </td>
                  <td> <input id="message_header__input"  type="text"     placeholder="Type something"      value={header}   onChange={(e) => setHeader  (e.target.value)} required/> </td>
                </tr>

                <tr>
                  <td> <label> Message to show on success:                                                                                                                                 </label> </td>
                  <td> <input id="message_success__input" type="text"     placeholder="Type something"      value={messageSuccess}  onChange={(e) => setMessageSuccess (e.target.value)} required/> </td>
                </tr>   

                <tr>    
                  <td> <label> Message to show on failure:                                                                                                                                 </label> </td>
                  <td> <input id="message_failure__input" type="text"     placeholder="Type something"      value={messageFailure}  onChange={(e) => setMessageFailure (e.target.value)} required/> </td>
                </tr>

                <tr>
                  <td> <label> Certificate Templates: </label> </td>
                  <td> <select id="certificate__select" onChange={(e) => setCertificateTemplate (e.target.value)}>
                          {certificateTemplates && certificateTemplates.map((certificate) => (
                            <option key={certificate.id} value={certificate.template}> {certificate.template} </option>
                          ))}
                        </select> </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content__section">
            <table id="email_delivery__table">
              <tbody>
                <tr className="space_under header_row border_bottom">
                  <th colspan="2"> Email Delivery Upon Test Completion </th>
                </tr>
                <tr>
                  <td> <label> Current Status: "{status === "OFF" ? `OFF` : "ON"}"                                                                                                         </label> </td>
                  <td> <div id="sending_emails__container">      
                          <label id="sending_emails__label" > Emails {status === "OFF" ? `won't` : "will"} be sent upon test completion.                                                   </label>
                          <label                    > to turn {status === "OFF" ? "ON" : "OFF"} email delivery, {status === "OFF" ? "fill out" : "reset"} the mandatory                    </label>
                          <label                    > fields in this section:                                                                                                              </label>
                        </div> </td>
                </tr>

                <tr>
                  <td> <label> From: </label> </td>
                  <td> <input id="from__input"  type="text" value={from}  onChange={(e) => handleStatus(e.target.value)}                                                                         /> </td>
                </tr>      
          
                <tr>       
                  <td> <label> CC: </label> </td>      
                  <td> <input id="cc__input"    type="text" value={cc}    onChange={(e) => setCC(e.target.value)}   disabled={from ? false : true}                                               /> </td>
                </tr>      
          
                <tr>       
                  <td> <label> BCC: </label> </td>       
                  <td> <input id="bcc__input"   type="text" value={bcc}   onChange={(e) => setBCC(e.target.value)}  disabled={from ? false : true}                                               /> </td>
                </tr>      
              </tbody>
            </table>       
         
         
            <table id="passing_test__table">   
              <tbody>
                <tr className="space_under sub_header_row border_bottom">
                  <th colspan="2"> Passing the test </th>
                </tr>
                <tr>       
                  <td> <label> Message subject:                                                                                                                                            </label> </td>
                  <td> <input id="message_subject__input" type="text" value={passingMessageSubject} onChange={(e) => setPassingMessageSubject(e.target.value)}  disabled={from ? false : true}   /> </td>
                </tr>      
          
                <tr>       
                  <td> <label> Message body:                                                                                                                                               </label> </td>
                  <td> <input id="message_body__input"    type="text" value={passingMessageBody}    onChange={(e) => setPassingMessageBody(e.target.value)} disabled={from ? false : true}       /> </td>
                </tr>

                <tr>
                  <td>
                    <label style={{fontWeight: 'bold'}}> Predefined Templated - Click to copy to clipboard </label>
                    <label> NEED TO ADD TEMPLATES HERE </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <table id="failing_test__table">
            <tbody>
              <tr className="space_under sub_header_row border_bottom">
                  <th colspan="2"> Failing the test </th>
                </tr>
              <tr>
                <td> <label> Message subject:                                                                                                                                            </label> </td>
                <td> <input id="message_subject__input" type="text" value={failingMessageSubject} onChange={(e) => setFailingMessageSubject(e.target.value)}  disabled={from ? false : true}   /> </td>
              </tr>

              <tr>
                <td> <label> Message body:                                                                                                                                               </label> </td>
                <td> <input id="message_body__input"    type="text" value={failingMessageBody}    onChange={(e) => setFailingMessageBody(e.target.value)} disabled={from ? false : true}       /> </td>
              </tr>

              <tr>
                <td>
                  <label style={{fontWeight: 'bold'}}> Predefined Templated - Click to copy to clipboard </label>
                  <label> NEED TO ADD TEMPLATES HERE </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="bottom_content__container">
          <div id="questions__container">
            <h2 className="section__headers"> Questions </h2>
            <div id="explanation">
              <label style={{fontWeight: 'bold'}}> Note: This test is set to be a {`'${testType}'`} test, which means:</label>
              
              {/* INSTEAD OF THIS: */}
              <label className="sub__label"> All the questions that you select here will be included in the test. </label>
              <label className="sub__label"> All respondents will receive the SAME set of questions presented in a different order. </label>

              {/* NEED TO CHANGE THE 'LINK' TO SOMETHING ELSE - SOMETHING THAT WILL REFER THE USER BACK TO THE TEST DETAILS  */}
              <label className="sub__label"> *TIP: if you want each respondent to receive a different set of questions, change the test type to 'Random' in the <Link to={"/admin/" + test === undefined ? "create" : "edit" + "-test#test_type__select"} >Test Details</Link> section.* </label>

              {/* FOR EVERY LABEL OR SOMETHING FROM THE DB THAT CONTAINS THE TEST TYPES, I WILL NEED TO DO THIS */}
              {/* <label className="sub__label"> {TestType.child.text} </label> */}
            </div>

            <div id="question_table__container">
              <label style={{fontWeight: 'bold', color: 'orange'}}> Select the questions that you want to include in the test </label>
              <label> You can use the tag filter to narrow down the list to a specific subject - Don't worry, filtering won't affect your previous selections. </label>

              <div id="filter__container">
                <label style={{fontWeight: 'bold'}}> Filter by tags or content </label>
                <input id="tag_content__input" type="text"
                            onChange={(e) => { setFilterContent(e.target.value); filterContent === "" ? setFilter(false) : setFilter(true)} }
                            placeholder='Enter a list of keywords separated by commas'/>
                    <label id="filter_state"> Filter is {filter === false ? "OFF" : "ON"}  </label>
              </div>

              <table id="questions__table">
                <tbody>
                  <tr>
                    <th> Currently showing {questionsAmount} questions ({questionsAmount} selected) </th>
                  </tr>
                  <tr>
                    {/* CHANGE THIS SO EVERY QUESTION THAT MATCHES THE FILTER WILL BE PLACED IN A NEW TABLE ROW, AND THAT THE SHOW BUTTON CAN SHOW THE QUESTIONS CONTENT
                    PLS PAY ATTENTION THAT THIS KIND OF OPEN MENU CAN BE CREATED AND RE-USED FOR THE 'TEST REPORT' PAGE AS WELL */}

                    <td>
                      <label> What is the DOM? </label>
                      <label> *IN SMALL TEXT* Javascript | Advanced</label>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div id="table_buttons__container">
                <label> Showing 1-{`AMOUNT OF QUESTIONS`} of {`AMOUNT OF QUESTIONS`} filtered questions</label>
                <button> Next 2 {`>>`} </button>
                <button> Show only Selected </button>
                <button> Show All {`AMOUNT OF QUESTIONS`} questions </button>
              </div>
            </div>

            <label> The test will include {`AMOUNT OF QUESTIONS`} in total </label>
          </div>
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