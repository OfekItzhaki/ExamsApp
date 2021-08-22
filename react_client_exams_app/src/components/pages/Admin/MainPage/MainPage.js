import React, { useEffect } from    'react';
import { Accordion }        from    '../../../shared/Accordion/Accordion';
import { AdminMenu }        from    '../../../../utils/content';
import admin_styles from './MainPage.css';

export default function MainPage() {

    useEffect(() => {
        document.title = 'Main Page';
    }, []);

    return (
        <div className='admin-mainpage'>
            <div id='main-container'>
                <div id="items-container">
                    <div id="select__container">
                        <label> Choose a field of study:  </label>
                        <select id='field'>
                            <option value='development'> Development </option>
                        </select>
                    </div>
                    <div id='accordions__container'>
                        <div className="accordion">
                            {AdminMenu.map(({ title, content }) => (
                                <Accordion title={title} content={content} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
