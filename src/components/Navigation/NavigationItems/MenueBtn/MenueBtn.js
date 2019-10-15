import React from 'react';
import classes from './MenueBtn.css';
const menueBtn = (props)=>(
    <div className={classes.MenueBtn} onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
    </div>
);

export default menueBtn;