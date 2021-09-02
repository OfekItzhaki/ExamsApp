import React, { useEffect,  useState        }   from 'react';
import        { useHistory, useLocation     }   from ''

export default function StartPage() {

    const [ tests,          setTests            ] = useState(null);
    const [ students,       setStudents         ] = useState(null);
    const [ studentExists,  setStudentExists    ] = useState(false);

    const [ firstName,      setFirstName        ] = useState("");
    const [ lastName,       setLastName         ] = useState("");
    const [ email,          setEmail            ] = useState("");

    const [ link,           setLink             ] = useState("");

    const location = useLocation();
    const history = useHistory();

    const handleSubmit = (event) => {
        console.log("handle submit");
        event.preventDefault();

        let test = tests.some((test) => test.link === link);

        let student = findStudent();

        if (studentExists) {

            history.push({
                pathname: `/student/${link}`,
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

    const findStudent = () => {
        students.map((student) => {
            if (student.fullName.includes().toLowerCase(`${firstName} ${lastName}`)) {
                console.log("student was found");
                studentExists(true);
                return student;
            } else {
                console.log("student wasn't found");
                return null;
            }
        })
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

        if (location.state) {
            if (location.state.link) setLink(location.state.link);
        }
    }, [])

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
                                <td> <input className="asterisk_input" value={email}        type="text" placeholder="Type something"    onChange={(e) => setEmail(e.target.value)}      required/> </td>
                            </tr>
                        </tbody>
                    </table>

                    <button id="submit__button" type="submit"> Submit </button>
                </div>
            </form>
        </div>
    )
};
