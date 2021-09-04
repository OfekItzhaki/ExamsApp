import React, { useEffect, useState         }   from 'react';
import        { useHistory, useLocation     }   from 'react-router-dom';

export default function AfterSubmit() {

    
    const [ test,               setTest             ] = useState("");

    const location = useLocation();
    const history = useHistory();

    const reviewAnswers = (event) => {
        console.log("handle submit");
        event.preventDefault();

        history.push({
            pathname: `/student/`,
            // search: '?update=true',  // query string
            state: {  // location state
                // update: true, 
                test: test
            },
        });
    }


    // Meant for fetching the necessary information on first render
    useEffect(() => {
        document.title = "End Test";

        if (location.state) {
            
            if (location.state.test) {
                setTest(location.state.test);
            }

        } else {
            history.push("/error404");
        }

    }, [])

    return (
        <div className="after_submit noselect">
            { test && <div id="test_results__container">
                <h1> {test.testName} </h1>
                <table>
                    <tbody>
                        <tr>
                            <td> Your Grade: </td>
                            <td> {test.grade} </td>
                        </tr>
                        <tr>
                            <td> Status: </td>
                            <td> {test.status} </td>
                        </tr>
                        <tr>
                            <td> Summary </td>
                            <td> {test.summary} </td>
                        </tr>
                        <tr>
                            <td> Passing Grade: </td>
                            <td> The minimum grade to pass this test was {test.passingGrade} </td>
                        </tr>
                    </tbody>
                </table>            
            </div>}

            <button id="review_answers" type="button"> Review Your Answers </button>
        </div>
    )
};
