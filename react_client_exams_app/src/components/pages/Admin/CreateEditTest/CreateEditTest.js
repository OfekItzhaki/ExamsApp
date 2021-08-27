import React, { useState, useEffect } from 'react';
import        { Button }              from '../../../shared/Button/Button';
import        { Link }                from 'react-router-dom';
import styles                         from './CreateEditTest.css';


export const CreateEditTest = ({ children, field, test }) => {

  // ----------------------------- Top Content Hooks -----------------------------

  // *General Details Table*
  const [ language,                   setLanguage               ] = useState("");
  const [ testType,                   setTestType               ] = useState("");
  const [ testName,                   setTestName               ] = useState("");
  const [ passingGrade,               setPassingGrade           ] = useState("");
  const [ messageHeader,              setMessageHeader          ] = useState("");
  const [ messageSuccess,             setMessageSuccess         ] = useState("");
  const [ messageFailure,             setMessageFailure         ] = useState("");
  const [ certificateTemplate,        setCertificateTemplate    ] = useState("");
  // *Email Delivery Table*         
  // Status Container          
  const [ status,                     setStatus                 ] = useState("OFF");
  const [ from,                       setFrom                   ] = useState("");   
  const [ cc,                         setCC                     ] = useState("");    
  const [ bcc,                        setBCC                    ] = useState("");    

  // Passing the Test Container
  const [ passingMessageSubject,      setPassingMessageSubject  ] = useState("");    
  const [ passingMessageBody,         setPassingMessageBody     ] = useState("");    

  // Failing the Test Container
  const [ failingMessageSubject,      setFailingMessageSubject  ] = useState("");    
  const [ failingMessageBody,         setFailingMessageBody     ] = useState("");  

  // --------------------------- Bottom Content Hooks ---------------------------
  
  // *Filter Container*
  const [filter, setFilter] = useState(false);
  const [filterContent, setFilterContent] = useState("");

  // *Questions Table
  const [questionsAmount, setQuestionsAmount] = useState(0);

  // ----------------------------------------------------------------------------

  const handleStatus = (value) => {
    setFrom(value);
  }

  useEffect(() => {
    document.title = `${test === undefined ? "Create" : "Edit"} Test`;
  }, [])

  return (
    <div className="create_edit_test">
      <h1 className="page__header"> {test === undefined ? "Create" : "Edit"} Test </h1>
      <form className="new_test__form">
        <div id="top_content__container">
          
          <h2 className="section__headers"> General Test Details </h2>
          <div className="content__section">
            {/* Might not work, JUST FOR NOW !!! */}
            <table id="general_details__table">
              <tbody>
                <tr>
                  <td> <label> Field of Study: </label> </td>
                  <td> <label id="field__label"> {field} </label> </td>
                </tr>

                <tr>
                  <td> <label> Language: </label> </td>
                  <td>  <select name="languages" id="language__select">
                        {/* <option className="question_type" value="" selected disabled hidden > Choose Language  </option> */}
                          <option value="english"     onChange={(e) => setLanguage (e.target.value)} defaultValue > English  </option>
                          <option value="hebrew"      onChange={(e) => setLanguage (e.target.value)}              > Hebrew   </option>
                        </select> </td>
                </tr>

                <tr>
                  <td> <label> Test Type: </label> </td>
                  <td>  <select id="test_type__select">
                          <option value="predefined"  onChange={(e) => setTestType (e.target.value)} defaultValue > Predefined - Same questions for all respondents       </option>
                          <option value="different"   onChange={(e) => setTestType (e.target.value)}              > Different  - Different questions for all respondents  </option>
                        </select> </td>
                </tr>
                
                <tr>
                  <td> <label> Test Name:                                                                                                                                                  </label> </td>
                  <td> <input id="test_name__input"       type="text"     placeholder="Type test name"      value={testName}        onChange={(e) => setTestName     (e.target.value)}           /> </td>
                </tr>

                <tr>
                  <td> <label> Passing Grade:                                                                                                                                              </label> </td>
                  <td> <input id="passing_grade__input"   type="text"     placeholder="Grade"               value={passingGrade}    onChange={(e) => setPassingGrade (e.target.value)}           /> </td>
                </tr>

                <tr>
                  <td> <label> Show correct answers after submission:                                                                                                                      </label> </td>
                  <td> <input id="show_answers__checkbox" type="checkbox" defaultChecked                                                                                                         /> </td>
                </tr>

                <tr>
                  <td> <label> Message header:                                                                                                                                             </label> </td>
                  <td> <input id="message_header__input"  type="text"     placeholder="Type something"      value={messageHeader}   onChange={(e) => setMessageHeader  (e.target.value)}         /> </td>
                </tr>

                <tr>
                  <td> <label> Message to show on success:                                                                                                                                 </label> </td>
                  <td> <input id="message_success__input" type="text"     placeholder="Type something"      value={messageSuccess}  onChange={(e) => setMessageSuccess (e.target.value)}         /> </td>
                </tr>   

                <tr>    
                  <td> <label> Message to show on failure:                                                                                                                                 </label> </td>
                  <td> <input id="message_failure__input" type="text"     placeholder="Type something"      value={messageFailure}  onChange={(e) => setMessageFailure (e.target.value)}         /> </td>
                </tr>

                <tr>
                  <td> <label> Certificate Templates:                                                                                                                                      </label> </td>
                  <td>  <select id="certificate__select">
                          <option value="no"            onChange={(e) => setCertificateTemplate (e.target.value)} defaultValue > No certificate template   </option>
                          <option value="certificate"   onChange={(e) => setCertificateTemplate (e.target.value)}              > Certificate               </option>
                        </select> </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content__section">
            <h2 className="section__headers"> Email Delivery Upon Test Completion </h2>
            <table id="email_delivery__table">
              <tbody>
                <tr>
                  <td> <label> Current Status:                                                                                                                                             </label> </td>
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
                  <td> <input id="cc__input"    type="text" value={cc}    onChange={(e) => setCC(e.target.value)}   disabled={from === "" ? true : false}                                        /> </td>
                </tr>      
          
                <tr>       
                  <td> <label> BCC: </label> </td>       
                  <td> <input id="bcc__input"   type="text" value={bcc}   onChange={(e) => setBCC(e.target.value)}  disabled={from === "" ? true : false}                                        /> </td>
                </tr>      
              </tbody>
            </table>       
         
         
            <table id="passing_test__table">   
              <tbody>
                <tr>       
                  <td> <label> Message subject:                                                                                                                                            </label> </td>
                  <td> <input id="message_subject__input" type="text" value={passingMessageSubject} onChange={(e) => setPassingMessageSubject(e.target.value)}                                   /> </td>
                </tr>      
          
                <tr>       
                  <td> <label> Message body:                                                                                                                                               </label> </td>
                  <td> <input id="message_body__input"    type="text" value={passingMessageBody}    onChange={(e) => setPassingMessageBody(e.target.value)} disabled={from === "" ? true : false}/> </td>
                </tr>

                <tr>
                  <label style={{fontWeight: 'bold'}}> Predefined Templated - Click to copy to clipboard </label>
                  <label> NEED TO ADD TEMPLATES HERE </label>
                </tr>
              </tbody>
            </table>
          </div>


          <table id="failing_test__table">
            <tbody>
              <tr>
                <td> <label> Message subject:                                                                                                                                            </label> </td>
                <td> <input id="message_subject__input" type="text" value={failingMessageSubject} onChange={(e) => setFailingMessageSubject(e.target.value)}                                   /> </td>
              </tr>

              <tr>
                <td> <label> Message body:                                                                                                                                               </label> </td>
                <td> <input id="message_body__input"    type="text" value={failingMessageBody}    onChange={(e) => setFailingMessageBody(e.target.value)} disabled={from === "" ? true : false}/> </td>
              </tr>

              <tr>
                <label style={{fontWeight: 'bold'}}> Predefined Templated - Click to copy to clipboard </label>
                <label> NEED TO ADD TEMPLATES HERE </label>
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
              <label className="sub__label"> All respondents will receive the SAME set of questions. presented in a different order. </label>

              {/* NEED TO CHANGE THE 'LINK' TO SOMETHING ELSE - SOMETHING THAT WILL REFER THE USER BACK TO THE TEST DETAILS  */}
              <label className="sub__label"> *TIP: if you want each respondent to receive a different set of questions, change the test type to 'Random' in the 
                <Link></Link> section.* </label>

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
                  <th> Currently showing {`AMOUNT OF QUESTIONS`} questions ({`AMOUNT OF QUESTIONS`} selected </th>
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
            <button onClick={ Back() }> {`<<` } Back  </button>
            <button onClick={ Show() }>      Show     </button>
            <button onClick={ Save() }>  Save {`>>` } </button>
          </div>
      </form>
    </div>
  )
};

function Add_Answer() {
    // console.log("add answer");
}

function removeAnswer() {
  // console.log("remove answer");
}

function Back() {
  // window.location.href = history.back;
}

function Show() {
  // window.location.href = history.back;
}

function Save() {
  // window.location.href = history.back;
}