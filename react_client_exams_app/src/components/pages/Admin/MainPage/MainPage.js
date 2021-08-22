import React, { useEffect } from 'react';
import Accordion from '../../../shared/Accordion/Accordion';
import { adminMenu } from '../../../../utils/content';
import './MainPage.css';

export default function MainPage() {

    useEffect(() => {
        document.title = 'Main Page';
    }, []);

    return (
        <div className='admin-mainpage'>
            <div id='container'>
                <div id="select__container">
                    <label> Choose a field of study:  </label>
                    <select id='field'>
                        <option value='development'> Development </option>
                    </select>
                </div>
                <div id='accordions__container'>
                    <div className="accordion">
                        {adminMenu.map(({ title, content }) => (
                            <Accordion title={title} content={content} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
