import React, { useState } from 'react';
import './Accordion.css';

export const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div onClick={() => setIsActive(!isActive)}>
        <div className={isActive ? 'accordion-title-activated' : 'accordion-title-deactivated'}> {title} {isActive ? '<<' : '>>'} </div>

      </div>
      <div className={isActive ? 'accordion-content-activated' : 'accordion-content-deactivated'}>
        {isActive && <div>{content}</div>}
      </div>
    </div>
  )
};