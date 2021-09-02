import React,   { useEffect, useState  }   from    'react';
import          { AdminMainPageMenu    }   from    '../../../../utils/AdminMenuPanel';
import          { useHistory           }   from    'react-router-dom';
import styles                              from    './MainPage.css';

export default function MainPage() {

    const [ fields,     setFields       ] = useState(null);
    const [ field,      setField        ] = useState(null); 

    const history = useHistory();

    const handleFieldChange = (f) => {
        setField(f);
        console.log(f);
    }
    
    const handleItemClick = (link, field) => {
        history.push({
            pathname: `${link}`,
            // search: '?update=true',  // query string
            state: {  // location state
                // update: true, 
              field: field
            },
        }); 
    }

    const fetchFields = () => {
        fetch("http://localhost:8000/fields", {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => { 
            setFields(data);
            setField(data[0].fieldTitle);

            process.env.REACT_APP_CURRENT_FIELD = data[0];
        })
        .catch((err) => console.log('error fetching tests:' + err))
    }

    useEffect(() => {
        document.title = 'Admin panel';
    }, []);
    
    useEffect(() => {
        let isMounted = true;           // note mutable flag
    
        if (isMounted) {                // add conditional check
            fetchFields();
        }
    
        return () => { isMounted = false }; // cleanup toggles value, if unmounted
    }, [])

    return (
        <div className="admin_mainpage noselect">
            <div id="main__container">
                <div id="header__container">
                    <h1> Administrator panel </h1>
                </div>
                <div id="content__container">
                    <table id="content__table">
                        <tbody>
                            <tr id="select__tr">
                                <td id="select__td">
                                    <label id="label__choose"> Choose a field of study: </label>
                                    <select id="fields__select" onChange={(e) => handleFieldChange(e.target.value)}>
                                        { fields && fields.map((field) => (
                                            <option key={field.fieldTitle} value={field.fieldTitle}> {field.fieldTitle} </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>

                            { AdminMainPageMenu.map((child) => (
                                <tr key={child.title}>
                                    <td> <button className="menu_item like_link_button" onClick={() => handleItemClick(child.link, field)}> {child.title} </button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
