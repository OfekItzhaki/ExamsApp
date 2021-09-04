import React, { useEffect,  useState        }   from 'react';
import        { useHistory     }                from 'react-router-dom';
import styles                                   from './StartPage.css';

export const StartPage = (props) => {

    const [ tests,          setTests            ] = useState(null);
    const [ students,       setStudents         ] = useState(null);

    const [ firstName,      setFirstName        ] = useState("");
    const [ lastName,       setLastName         ] = useState("");
    const [ email,          setEmail            ] = useState("");

    const [ linkID,         setLinkID           ] = useState("");
    const [ linkExists,     setLinkExists       ] = useState(false);

    const [ student,        setStudent          ] = useState(null);
    const [ test,           setTest             ] = useState(null);

    const history = useHistory();

    const handleSubmit = (event) => {
        console.log("handle submit");
        event.preventDefault();

        findStudent();
    }

    const findStudent = () => {
        students.map((student) => {
            let fullName = (`${firstName} ${lastName}`);

            if (student.fullName.includes(fullName.toLowerCase())) {
                console.log("student was found");
                setStudent(student);
            } else {
                console.log("student wasn't found");
            }
        })
    }

    const pushHistory = () => {

        console.log("push history")
        if (student) {
            console.log("student is defined")

            console.log(linkID);

            history.push({
                pathname: `/student/test/${linkID}`,
                // search: '?update=true',  // query string
                state: {  // location state
                    // update: true, 
                    student: {
                        studentID: student.studentID,
                        fullName: student.fullName,
                        email: email
                    },
                    test: test
                },
            });
        }
    }


    const checkLink = (link) => {
        let exists = false;

        console.log("inside check")

        if (tests !== null) {
            tests.map((test) => {
                if (test.link === link) {
                    setTest(test);
                    setLinkExists(true);
                    exists = true;
                }
            })
            
            if (exists === false) { 
                history.push("/error404");
            }
        }
    }

    const fetchStudents = () => {
        fetch("http://localhost:8000/students", {
            method: 'GET',
          })
          .then((res) => res.json())
          .then((data) => { 
            setStudents(data); 
          })
          .catch((err) => console.log('error students:' + err))
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


    // Meant for fetching the necessary information on first render
    useEffect(() => {
        document.title = "State Test";
    }, [])

    useEffect(() => {

        pushHistory();

    }, [student, test])

    useEffect(() => {
        if (props) {
            console.log(props);
            if (props.location.pathname) {
                checkLink(props.location.pathname);
                setLinkID(props.match.params.randomID);
            }
        }

    }, [tests])

      // Meant for fetching the necessary information on first render
  useEffect(() => {
    let isMounted = true;           // note mutable flag

    if (isMounted) {                // add conditional check
        fetchTests();
        fetchStudents();
    }

    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [])

    return (
        <div className="start_page noselect">
            { linkExists && <div id="start_page_content__container">
                <label> Please complete the following form to begin: </label>
                <form id="start_page__form" onSubmit={handleSubmit}>
                    <div id="start_page_content__container">
                        <table id="start_page__table">
                            <tbody>
                                <tr>
                                    <td> <label> First Name: </label> </td>
                                    <td> <input className="asterisk_input" value={firstName}    type="text" placeholder="Type something"    onChange={(e) => setFirstName(e.target.value)}  required/> </td>
                                </tr>

                                <tr>
                                    <td> <label> Last Name: </label> </td>
                                    <td> <input className="asterisk_input" value={lastName}     type="text" placeholder="Type something"    onChange={(e) => setLastName(e.target.value)}   required/> </td>
                                </tr>

                                <tr>
                                    <td> <label> Email: </label> </td>
                                    <td> <input className="asterisk_input" value={email}        type="email" placeholder="Type something"    onChange={(e) => setEmail(e.target.value)}      required/> </td>
                                </tr>
                            </tbody>
                        </table>

                        <button type="submit"> Submit </button>
                    </div>
                </form>
            </div> }
        </div>
    )
};

export default StartPage;