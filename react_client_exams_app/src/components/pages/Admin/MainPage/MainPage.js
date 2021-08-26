import React, { useEffect } from    'react';
import { Accordion }        from    '../../../shared/Accordion/Accordion';
import { AdminMenu }        from    '../../../../utils/content';
import admin_styles from './MainPage.css';

export default function MainPage() {

    useEffect(() => {
        document.title = 'Admin panel';
    }, []);

    return (
        <div className='admin_mainpage noselect'>
            <div id='main__container'>
                <div id='header__container'>
                    <h1> Administrator panel </h1>
                </div>
                <div id='content__container'>
                    <table id='content__table'>
                        <tbody>
                            <tr id="select__tr">
                                <td id='select__td'>
                                    <label id='label__choose'> Choose a field of study:</label>
                                    <select id='field'>
                                        <option value='development'> Development </option>
                                    </select>
                                </td>
                            </tr>
                            <tr id='accordion__tr'>
                                <td>
                                    {AdminMenu.map(({ title, content }) => (
                                                    <Accordion key={title} title={title} content={content} />
                                                ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
