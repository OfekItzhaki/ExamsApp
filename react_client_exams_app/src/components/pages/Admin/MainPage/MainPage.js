import React, { useEffect }         from    'react';
import { AdminMainPageMenu }        from    '../../../../utils/content';
import { Link }                     from    'react-router-dom';
import styles                       from    './MainPage.css';

export default function MainPage() {

    useEffect(() => {
        document.title = 'Admin panel';
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
                                    <label id="label__choose"> Choose a field of study:</label>
                                    <select id="field">
                                        <option value="development"> Development    </option>
                                        <option value="development"> Design         </option>
                                    </select>
                                </td>
                            </tr>

                            { AdminMainPageMenu.map((child) => (
                            <tr key={child.title}>
                                <td> <Link className="menu_item" to={child.link}> {child.title} </Link> </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
