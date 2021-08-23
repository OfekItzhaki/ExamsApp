import React, { useEffect } from    'react';
import { Accordion }        from    '../../../shared/Accordion/Accordion';
import { AdminMenu }        from    '../../../../utils/content';
import admin_styles from './MainPage.module.css';

export default function MainPage() {

    useEffect(() => {
        document.title = 'Admin panel';
    }, []);

    return (
        <div className='admin_mainpage'>
            <div id='main__container'>
                <div id='header__container'>
                    <h1> Administrator panel </h1>
                </div>
                <div id='content__container'>
                    <table id='content__table'>
                        <tr>
                            <td>
                                <div id='select__container'>
                                <label id='label__choose'> Choose a field of study:</label>
                                    <select id='field'>
                                        <option value='development'> Development </option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr id='accordion__table_row'>
                            <div id='accordions__container'>
                                <div className='accordion'>
                                    {AdminMenu.map(({ title, content }) => (
                                        <Accordion title={title} content={content} />
                                    ))}
                                </div>
                            </div>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
};
