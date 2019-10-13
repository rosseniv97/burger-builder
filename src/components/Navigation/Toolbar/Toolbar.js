import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import MenueBtn from '../NavigationItems/MenueBtn/MenueBtn'
const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <MenueBtn toggle={props.toggleMenue}>Menue</MenueBtn>
        
        <div className={classes.Logo} >
            <Logo/>
        </div>

        <nav className={classes.DesktopOnly}>
           <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;