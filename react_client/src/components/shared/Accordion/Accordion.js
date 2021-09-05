import React, { useState }  from 'react';
import styles               from './Accordion.css';

export const Accordion = (props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={isActive ? 'accordion_item_activated' : 'accordion_item_deactivated'}>
      <div onClick={() => setIsActive(!isActive)}>
        <div className={isActive ? 'accordion_title_activated' : 'accordion_title_deactivated'}   >   {props.title} {isActive ? '<<' : '>>'}  </div>  </div>
      <div className={isActive ? 'accordion_content_activated' : 'accordion_content_deactivated'} >  {isActive && <div> {props.content}       </div>}  </div>
    </div>
  )
};