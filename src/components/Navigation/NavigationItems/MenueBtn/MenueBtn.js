import React from 'react';
import classes from './MenueBtn.css';
const menueBtn = (props)=>(
    <button className={classes.MenueBtn} onClick={props.toggle}>
    {props.children}
    </button>
);

export default menueBtn;