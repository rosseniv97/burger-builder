import React from 'react'
import logoLoc from '../../assets/images/burger-logo.png';
import classes from './Logo.css';
const logo = (props)=>(
    <div className={classes.Logo}>
        <img src={logoLoc}/>
    </div>
);

export default logo;