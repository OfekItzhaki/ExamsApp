import React, { useState, useEffect } from 'react';
import styles                         from '../TagsInput/TagsInput.scss';

export const TagsInput = props => {

    const [tags, setTags] = useState([]);

    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };
    
    return (
        <div className="tags-input">
            {tags.map((tag, index) => (
                <li key={index}>
                    <span>{tag}</span>
                    <i
                        className="material-icons"
                        onClick={() => removeTags(index)} 
                    >
                        close
                    </i>
                </li>
            ))}
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter to add tags"
            />
        </div>
    );
};