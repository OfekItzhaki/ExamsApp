import React, { useState }  from 'react';
import styles               from '../TagsInput/TagsInput.scss';

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
        <div id="tags-input">
            <input type="text" onKeyUp={event => addTags(event)} placeholder="Press enter to add tags" />
            
            <div id="tags">
                {tags.map((tag, index) => (
                    <li className="tag" key={index}>
                        <span className="tag-title"> {tag} </span>
                        <i className="tag-close-icon" onClick={() => removeTags(index)} > x </i>
                    </li>
                ))}
            </div>
        </div>
    );
};