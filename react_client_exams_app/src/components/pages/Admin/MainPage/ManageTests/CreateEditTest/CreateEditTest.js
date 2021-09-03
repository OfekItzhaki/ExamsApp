import React, { useState, useEffect     }   from  'react';
import        { HashLink as Link        }   from  'react-router-hash-link';
import        { useHistory, useLocation }   from  'react-router-dom';
import        { Filter                  }   from '../../../../../Admin/Filter/Filter';
import        { QuestionTable           }   from '../../../../../Admin/QuestionTable/QuestionTable';
import styles                               from  './CreateEditTest.css';

export default function CreateEditTest() {

  // -------------------------------------------- Fetch Info Hooks --------------------------------------------

  const [ field,                      setField                  ] = useState(null);
  const [ test,                       setTest                   ] = useState(null);

  const [ tests,                      setTests                  ] = useState(null);
  const [ testTypes,                  setTestTypes              ] = useState(null);
  const [ certificateTemplates,       setCertificateTemplates   ] = useState(null);
  const [ languages,                  setLanguages              ] = useState(null);
  const [ questions,                  setQuestions              ] = useState(null);
  const [ filteredQuestions,          setFilteredQuestions      ] = useState(null);

  // -------------------------------------------- Top Content Hooks -------------------------------------------

  // *General Details Table*
  const [ testID,                     setTestID                 ] = useState(0);
  const [ testCode,                   setTestCode               ] = useState(0);
  const [ testType,                   setTestType               ] = useState("");
  const [ testName,                   setTestName               ] = useState("");
  const [ language,                   setLanguage               ] = useState("");
  const [ passingGrade,               setPassingGrade           ] = useState("");
  const [ header,                     setHeader                 ] = useState("");
  const [ messageSuccess,             setMessageSuccess         ] = useState("");
  const [ messageFailure,             setMessageFailure         ] = useState("");
  const [ version,                    setVersion                ] = useState(1);
  const [ certificateTemplateID,      setCertificateTemplateID  ] = useState(0);
  const [ reviewTest,                 setReviewTest             ] = useState(false);
  const [ lastUpdate,                 setLastUpdate             ] = useState(Date.now());
  const [ link,                       setLink                   ] = useState("");

  // *Email Delivery Table*         
  // Status Container          
  const [ status,                     setStatus                 ] = useState("OFF");
  const [ from,                       setFrom                   ] = useState("");
  const [ cc,                         setCC                     ] = useState("");
  const [ bcc,                        setBCC                    ] = useState("");    

  // Passing the Test Container
  const [ passingSubject,             setPassingSubject         ] = useState("");
  const [ passingBody,                setPassingBody            ] = useState("");    

  // Failing the Test Container
  const [ failingSubject,             setFailingSubject         ] = useState("");   
  const [ failingBody,                setFailingBody            ] = useState("");    

  // -------------------------------------------- Bottom Content Hooks ----------------------------------------

  // *Filter Container*
  const [ filterStatus,               setFilterStatus           ]  = useState(false);
  const [ filterByTags,               setFilterByTags           ]  = useState(true);

  // *Questions Table
  const [ questionsAmount,            setQuestionsAmount        ] = useState(0); 
  const [ selectedQuestions,          setSelectedQuestions      ] = useState([]);

  // ----------------------------------------------------------------------------------------------------------

  const location = useLocation();
  const history = useHistory();
  
  const handleBack = () => {
    history.goBack();
  }
  
  const handleShow = () => {
    
  }
  
  const handleShowSelected = () => {
    
  }

  const handleShowAll = () => {
    
  }

  const initialStates = () => {

  }

  const handleSelectedQuestion = (newSelectedQuestions) => {
    setSelectedQuestions(newSelectedQuestions);
  }

  const handleFilterByChange = (value) => {
    if (value === "tags") setFilterByTags(true);
    else setFilterByTags(false);
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

  const handleStatus = (value) => {
    if (value === "") setStatus("OFF");
    else setStatus("ON");
  }

  const handleFromChange = (value) => {
    handleStatus(value);
    setFrom(value);
  }

  const generateRandomID = (length) => {

    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const generateRandomLink = () => {
    let length = 10;
    let randomID = generateRandomID(length);
    setTestCode(randomID);
    let randomLink = `/student/${randomID}`

    tests.map((test) => {
      if (test.testCode === randomID) {
            randomID = generateRandomID(length);
            setTestCode(randomID);
            randomLink = `/student/${randomID}`
      }
    });

    return randomLink;
  }

  const handleSubmit = (event) => {  
    event.preventDefault();
    let link = generateRandomLink();
    setLink(link);

    submitTest(link);
  }

  const submitTest = (link) => {
    console.log(testID);
    fetch('http://localhost:8000/tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      testID: testID,
      testCode: testCode,
      testName: testName,
      testType: testType,
      language: language,
      questions: selectedQuestions,
      passingGrade: passingGrade,
      header: header,
      messageSuccess: messageSuccess,
      messageFailure: messageFailure,
      passingSubject: passingSubject,
      passingBody: passingBody,
      failingSubject: failingSubject,
      failingBody: failingBody,
      link: link,
      version: version,
      reviewTest: reviewTest,
      lastUpdate: lastUpdate
      }),
    })
      .then((res) => res.json())
      .then((data) => { 
        console.log(data); 
        // initialState(); 
      })
      .catch((err) => console.log(`error ${err}`))
  }

  const caseEditTest = () => {

    let editTest = location.state.test;
    setTest(editTest);
    setTestID(editTest.testID);
    setTestCode(editTest.testCode);
    setTestType(editTest.testType);
    setTestName(editTest.testName);
    setLanguage(editTest.language);
    setSelectedQuestions(editTest.questions);
    setPassingGrade(editTest.passingGrade);
    setHeader(editTest.header);
    setMessageSuccess(editTest.messageSuccess);
    setMessageFailure(editTest.messageFailure);
    setPassingSubject(editTest.passingSubject);
    setPassingBody(editTest.passingBody);
    setFailingSubject(editTest.failingSubject);
    setFailingBody(editTest.failingBody);
    setLink(editTest.link);
    setVersion(editTest.version + 1);
    setCertificateTemplateID(editTest.certificateTemplate);
    setReviewTest(editTest.reviewTest);
    setLastUpdate(editTest.lastUpdate);
  }

  const fetchLanguages = () => {
    fetch("http://localhost:8000/languages", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setLanguages(data); 
      setLanguage(language !== "" ? language : data[0].languageType); 
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
      setTestType(testType !== "" ? testType : data[0].typeName); 
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
      setCertificateTemplateID(certificateTemplateID !== "" ? certificateTemplateID : data[0].templateID); 
    })
    .catch((err) => console.log('error fetching certificate templates:' + err))
  }

  const fetchQuestions = () => {
    fetch("http://localhost:8000/questions", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setQuestions(data);
      setFilteredQuestions(data); 
    })
    .catch((err) => console.log('error fetching questions:' + err))
  }

  const fetchTests = () => {
    fetch("http://localhost:8000/tests", {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => { 
      setTests(data); 
      if (test === null) setTestID(data[data.length - 1].testID + 1); 
    })
    .catch((err) => console.log('error fetching test types:' + err))
  }

  useEffect(() => {
    document.title = `${test === null ? "Create" : "Edit"} Question`;

    if (location.state) {

      if (location.state.field) {
        console.log(location.state.field);
        setField(location.state.field);
      }

      if (location.state.test) {
        console.log(location.state.test);
        caseEditTest();
      }
    }
  }, [location.state])

    // Meant for fetching the necessary information on first render
  useEffect(() => {
    let isMounted = true;           // note mutable flag

    if (isMounted) {                // add conditional check
      fetchLanguages();
      fetchTestTypes();
      fetchCertificateTemplates();
      fetchTests();
      fetchQuestions();
    }

    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [])

  return (
    <div className="create_edit_test noselect">
      <h1 className="page__header"> {test === null ? "Create" : "Edit"} Test </h1> {/* className="page__header" */}
      <form className="new_test__form" onSubmit={handleSubmit}>
        <div id="top_content__container">
          
          <div className="content__section">
            <table id="general_details__table">
              <tbody>
                <tr className="space_under header_row border_bottom">
                  <th colSpan="2"> General Test Details </th>
                </tr>
                <tr>
                  <td> <label> Field of Study: </label> </td>
                  <td> <label id="field__label"> {field === null ? "undefined" : field} </label> </td>
                </tr>

                <tr>
                  <td> <label> Language: </label> </td>
                  <td>  <select id="language__select" onChange={(e) => setLanguage (e.target.value)}>
                          {languages && languages.map((language) => (
                            <option key={language.languageID} value={language.languageName}> {language.languageName} </option>
                          ))} 
                        </select> </td>
                </tr>

                <tr>
                  <td> <label> Test Type: </label> </td>
                  <td> <select id="test_type__select" onChange={(e) => setTestType (e.target.value)}>
                          {testTypes && testTypes.map((testType) => (
                            <option key={testType.typeID} value={testType.typeName}> {testType.typeName} </option>
                          ))}
                        </select> </td>
                </tr>
                
                <tr>
                  <td> <label> Test Name:                                                                                                                                                           </label> </td>
                  <td> <input id="test_name__input"       type="text"       placeholder="Insert test name"            value={testName}        onChange={(e) => setTestName(e.target.value)}         required/> </td>
                </tr>

                <tr>
                  <td> <label> Passing Grade:                                                                                                                                                       </label> </td>
                  <td> <input id="passing_grade__input"   type="text"       placeholder="Insert passing grade"        value={passingGrade}    onChange={(e) => setPassingGrade(e.target.value)}     required/> </td>
                </tr>

                <tr>
                  <td> <label> Show correct answers after submission:                                                                                                                               </label> </td>
                  <td> <input id="show_answers__checkbox" type="checkbox"                                           value={reviewTest}      onChange={(e) => setReviewTest(e.target.value)}       required/> </td>
                </tr>

                <tr>
                  <td> <label> Message header:                                                                                                                                                      </label> </td>
                  <td> <input id="message_header__input"  type="text"       placeholder="Insert header"               value={header}          onChange={(e) => setHeader(e.target.value)}           required/> </td>
                </tr>

                <tr>
                  <td> <label> Message to show on success:                                                                                                                                          </label> </td>
                  <td> <input id="message_success__input" type="text"       placeholder="Insert success message"      value={messageSuccess}  onChange={(e) => setMessageSuccess(e.target.value)}   required/> </td>
                </tr>   

                <tr>    
                  <td> <label> Message to show on failure:                                                                                                                                         </label> </td>
                  <td> <input id="message_failure__input" type="text"       placeholder="Insert failure message"      value={messageFailure}   onChange={(e) => setMessageFailure(e.target.value)}  required/> </td>
                </tr>

                <tr>
                  <td> <label> Certificate Templates: </label> </td>
                  <td> <select id="certificate__select" onChange={(e) => setCertificateTemplateID(e.target.key)}>
                          {certificateTemplates && certificateTemplates.map((certificate) => (
                            <option key={certificate.templateID} value={certificate.templateName}> {certificate.templateName} </option>
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
                  <th colSpan="2"> Email Delivery Upon Test Completion </th>
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
                  <td> <input id="from__input"  type="text" value={from}  onChange={(e) => handleFromChange(e.target.value)}                                                                     /> </td>
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
                  <th colSpan="2"> Passing the test </th>
                </tr>
                <tr>       
                  <td> <label> Message subject:                                                                                                                                            </label> </td>
                  <td> <input id="message_subject__input" type="text" value={passingSubject} onChange={(e) => setPassingSubject(e.target.value)}  disabled={from ? false : true}   /> </td>
                </tr>      
          
                <tr>       
                  <td> <label> Message body:                                                                                                                                               </label> </td>
                  <td> <input id="message_body__input"    type="text" value={passingBody}    onChange={(e) => setPassingBody(e.target.value)} disabled={from ? false : true}       /> </td>
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
                <td> <label> Message subject:                                                                                                                                     </label> </td>
                <td> <input id="message_subject__input" type="text" value={failingSubject} onChange={(e) => setFailingSubject(e.target.value)}  disabled={from ? false : true}   /> </td>
              </tr>

              <tr>
                <td> <label> Message body:                                                                                                                                        </label> </td>
                <td> <input id="message_body__input"    type="text" value={failingBody}    onChange={(e) => setFailingBody(e.target.value)} disabled={from ? false : true}       /> </td>
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
              <label style={{fontWeight: 'bold'}}> Note: This test is set to be a "{`${testType}`}" test, which means:</label>
              
              <ul>
                <li> All the questions that you select here will be included in the test. </li>
                <li> All respondents will receive {`${testType.includes("random") ? "a DIFFERENT" : "the SAME"}`} set of questions, presented in a different order. </li>
              </ul>

              <label className="sub__label"> *TIP: if you want each respondent to receive {`${testType.includes("random") ? "the SAME" : "a DIFFERENT"}`} set of questions, change the test type to "{`${testType.includes("random") ? "Predefined" : "Random"}`}" in the 
                  <Link to={`/admin/${test === null ? "create" : "edit"}-test#test_type__select`} > Test Details</Link> section.* </label>
            </div>

            <div id="question_table__container">
              <label style={{fontWeight: 'bold', color: 'orange'}}> Select the questions that you want to include in the test </label>
              <label> You can use the tag filter to narrow down the list to a specific subject - Don't worry, filtering won't affect your previous selections. </label>

              { questions && filteredQuestions && <Filter filterStatus={filterStatus} totalAmount={questions.length} filteredAmount={filteredQuestions.length} 
                handleFilterByChange={handleFilterByChange} handleFilterContentChange={handleFilterContentChange}/> }

              { <QuestionTable createEditTest={true} questions={filteredQuestions} filteredQuestions={filteredQuestions} selectedQuestions={selectedQuestions} tests={tests} 
                handleSelectedQuestion={handleSelectedQuestion} handleShowAll={handleShowAll} handleShowSelected={handleShowSelected}/> }

                <label> The test will include {selectedQuestions.length} questions in total </label>
            </div>
          </div>
        </div>

        <div id="buttons__container">
            <button className="regular__button" onClick={() => handleBack() }> {`<<` } Back  </button>
            <button className="regular__button" onClick={() => handleShow() }>  Show         </button>
            <button className="regular__button" type="submit"                >  Save {`>>` } </button>
          </div>
      </form>
    </div>
  )
};