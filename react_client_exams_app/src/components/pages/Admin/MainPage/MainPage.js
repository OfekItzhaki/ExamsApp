import React,   { useEffect, useState       }   from    'react';
import          { AdminMainPageMenu         }   from    '../../../../utils/content';
import          { Link                      }   from    'react-router-dom';
import styles                                   from    './MainPage.css';

export default function MainPage() {

    const [ fields,     setFields       ] = useState(null);
    const [ field,      setField        ] = useState(null); 

    useEffect(() => {
        document.title = 'Admin panel';
        let isMounted = true;               // note mutable flag

        fetch("http://localhost:8000/fields")
        .then(res => {
            return res.json();
        })
        .then((data) => {
            if (isMounted) {                // add conditional check 
                //    console.log(data); 
                   setFields(data);
                   setField(data[0]);
                   console.log(data[0]);

                   process.env.REACT_APP_CURRENT_FIELD = data[0];
            }
        });

    }, []);

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
                                    <select id="fields__select" defaultValue={field} onChange={() => setField(field)}>
                                        { fields && fields.map((field) => (
                                            <option key={field.id}> {field.title} </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>

                            { AdminMainPageMenu.map((child) => (
                            <tr key={child.title}>
                                <td> <Link className="menu_item" to={child.link} field={field}> {child.title} </Link> </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
