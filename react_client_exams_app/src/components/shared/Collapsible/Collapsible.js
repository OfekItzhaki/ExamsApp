import React from 'react';

export const Collapsible = ({
    children, 
    name,
    content,
    type, 
    onClick, 
}) => {

    const checkName = name != null ? name : 'undefined';
    const checkContent = content != null ? content : 'content is empty';

    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    }

    return (
        <>
            <button class="collapsible"> {checkName} </button>
            <div class="content">
                <p> {checkContent} </p>
            </div>
        </>
    )
};
