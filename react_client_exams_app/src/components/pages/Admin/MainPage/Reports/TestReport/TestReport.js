import React,   { useEffect, useState       }           from 'react';
import          { SummaryTable              }           from '../../../../../Admin/SummaryTable/SummaryTable';
import          { useHistory, useLocation   }           from 'react-router-dom';
import          { GradesTable               }           from '../../../../../Admin/GradesTable/GradesTable';
import          { QuestionStatisticsTable   }           from '../../../../../Admin/QuestionStatisticsTable/QuestionStatisticsTable';
import          { Filter                    }           from '../../../../../Admin/Filter/Filter';
import styles                                           from './TestReport.css'

export default function TestReport() {

    // ----------------------------- Fetch Info Hooks ----------------------------

    const [ studentTests,       setStudentTests           ] = useState(null);
    const [ questions,          setQuestions     ]  = useState(null);

    const [ test,               setTest                   ] = useState(null);
    const [ field,              setField                  ] = useState("");
    const [ dateRange,          setDateRange              ] = useState("");
    // const [ questions,          setQuestions              ] = useState([]);
    
    // ------------------------------ Summary Hooks ------------------------------
    
    const [ numOfSubmissions,   setNumOfSubmissions       ] = useState(0);
    const [ numPassed,          setNumPassed              ] = useState(0);
    const [ passingPercentage,  setPassingPercentage      ] = useState(0);
    const [ averageGrade,       setAverageGrade           ] = useState(0);
    const [ medianGrade,        setMedianGrade            ] = useState(0);
    // const [ numOfQuestions,      setNumOfQuestions      ] = useState(0);

    // ------------------------------ Grades Hooks -------------------------------

    const [ respondentChosen,   setRespondentChosen       ] = useState(false);

    // ---------------------------- Statistics Hooks -----------------------------

    // const [ filterContent,      setFilterContent          ] = useState("");

    const [ filterStatus,             setFilter        ]  = useState(false);
    const [ filterByTags,       setFilterByTags  ]  = useState(true);

    const [ filteredQuestions,  setFilteredQuestions  ] = useState([]);

    // ---------------------------------------------------------------------------

    const location = useLocation(); // for location state
    const history = useHistory();

    const back = () => {
        history.goBack();
    }

    const exportToExecl = () => {

    }

    const printReport = () => {

    }

    // Returns element closest to target in arr[]
    function findClosest(arr, target)
    {
        let n = arr.length;
    
        // Corner cases
        if (target <= arr[0])
            return arr[0];
        if (target >= arr[n - 1])
            return arr[n - 1];
    
        // Doing binary search
        let i = 0, j = n, mid = 0;
        while (i < j)
        {
            mid = (i + j) / 2;
    
            if (arr[mid] == target)
                return arr[mid];
    
            // If target is less than array
            // element,then search in left
            if (target < arr[mid])
            {
        
                // If target is greater than previous
                // to mid, return closest of two
                if (mid > 0 && target > arr[mid - 1])
                    return getClosest(arr[mid - 1],
                                    arr[mid], target);
                
                // Repeat for left half
                j = mid;             
            }
    
            // If target is greater than mid
            else
            {
                if (mid < n - 1 && target < arr[mid + 1])
                    return getClosest(arr[mid],
                                    arr[mid + 1],
                                    target);               
                i = mid + 1; // update i
            }
        }
    
        // Only single element left after search
        return arr[mid];
    }
    
    // Method to compare which one is the more close
    // We find the closest by taking the difference
    //  between the target and both values. It assumes
    // that val2 is greater than val1 and target lies
    // between these two.
    function getClosest(val1, val2, target)
    {
        if (target - val1 >= val2 - target)
            return val2;       
        else
            return val1;       
    }


    const scanThroughStudentTests = (data) => {
        let passed = 0;
        let submissions = 0;
        data.map((studentTest) => {
            submissions++;

            // console.log("passing grade: " + location.state.test.passingGrade);
            // console.log("student grade: " + studentTest.grade);
            if (studentTest.grade >= location.state.test.passingGrade) passed++;
            return studentTest;
        });
        setNumOfSubmissions(submissions);
        setNumPassed(passed);

        // calc(totalGrades);     
        calcAdditionalInformation(data, submissions);
    }

    const calcAdditionalInformation = (data, submissions) => {
        let totalGrades = 0;
        let gradesArray = [];
        data.map((studentTest) => {
            gradesArray.push(studentTest.grade);
            totalGrades += studentTest.grade;
            return "";
        });

        // Calc passing percentage -> passed divide by total submissions (multiply by 100 to get the percentage)
        setPassingPercentage( (numPassed / submissions) * 100 );

        // Calc average grade -> total grades divide by total submissions
        let average = totalGrades / submissions;
        setAverageGrade(Math.round(average));

        // Calc median grade ->
        setMedianGrade(findClosest(gradesArray, average));

    }
    
    const countTestQuestions = () => {
        let counter = 0;
        test && test.questions.map(() => counter++);
        return counter;
    }

    const handleFilterByChange = (value) => {
        if (value === "tags") setFilterByTags(true);
        else if (value === "content") setFilterByTags(false);
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
                if (question.title.toLowerCase().includes(value)) contains = true;
            }

            if (contains === true) return question;

        }));
    }

    // This function gets the student ID from the child component and sets it as the chosen respondent
    const handleRespondentClick = (id) => {
        if (respondentChosen.studentID !== id) {
            console.log(id);
            setRespondentChosen(id);
        }
    }

    const handleFetchStudentTests = (data) => {
        console.log("handle fetch students tests");
        setStudentTests(data);
        scanThroughStudentTests(data);
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

    const fetchStudentTests = () => {
        fetch("http://localhost:8000/studentTests", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => { 
            handleFetchStudentTests(data);
         })
        .catch((err) => console.log('error fetching student tests: ' + err));
    }

    useEffect(() => {
        document.title = "Test Report";
    }, [])

    useEffect(() => {
        let isMounted = true;           // note mutable flag

        if (isMounted) {                // add conditional check
            fetchStudentTests();
            fetchQuestions();
        }

        setField(location.state.field);
        setDateRange(location.state.dateRange);

    }, [])

    return (
        <div className="test_report noselect">
            <div id="headers__container">
                <h1> Test result for {field} </h1>
            </div>

            <div id="content__container">
                <div id="summary__container">
                    <h1> Summary </h1>
                    <div id="summary_tables__container">
                        { location.state.test && <SummaryTable test={location.state.test} dateRange={dateRange} submissions={numOfSubmissions} numPassed={numPassed} passingPercentage={passingPercentage}
                            average={averageGrade} median={medianGrade} countNumberOfQuestions={countTestQuestions}/> }
                    </div>
                </div>
                <div id="grades__container">
                    <h1> Respondent Grades and Answers </h1>
                    <div id="grades_table__container">
                        <label> Click a name from the list to see the respondent's test </label>
                        { studentTests && location.state.test && <GradesTable test={location.state.test} studentTests={studentTests} handleRespondentClick={handleRespondentClick}/> }
                    </div>
                </div>

                <div id="question_statistics__container">
                    <h1> Question Statistics </h1>
                    <label> Click a question to show statistics regarding it's answers, then click the answers to see which answer each respondent selected. </label>
                    <label> You can use the following buttons to do the same with all the questions in the list. </label>
                    <div id="filter__container">
                        <div id="filter_by__container">
                            { questions && filteredQuestions && <Filter filterStatus={filterStatus} totalAmount={questions.length} filteredAmount={filteredQuestions.length} 
                                handleFilterByChange={handleFilterByChange} handleFilterContentChange={handleFilterContentChange}/> }
                        </div>
                        <label> Filtered {`AMOUNT`} of total {`AMOUNT`} </label>
                    </div>
                    <div id="question_statistics_table__container">
                        { studentTests && <QuestionStatisticsTable/>}
                    </div>

                    <div id="buttons__container">
                        <button className="regular__button" onClick={() => back()}>             {`<<`} Back         </button>
                        <button className="regular__button" onClick={() => exportToExecl()}>    Export To Excel     </button>
                        <button className="regular__button" onClick={() => printReport()}>      Print Report        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};