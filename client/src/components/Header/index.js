import React, {Component} from 'react';

import Button from '../Button'
import Search from '../Search'
import logo from "./hand-drawn-pencil-icon.png";

import './header.scss'
import {NavLink} from "react-router-dom";

function Header({value, onSearch}) {
    return (
        <header className='row p-2'>
            <div className='header__logo col-2 col-md-4 align-content-center'>
                <img className='header__logo-img' alt='pencil-logo' src={logo}/>
                <span className='header__logo-txt d-none d-md-inline-block'>WIRED-KEEPER</span>
            </div>
            <div className="header__buttons col-10 col-md-5">

                <NavLink to='/createNote'>
                    <Button
                        title={'Create Note'}
                    />
                </NavLink>
                <NavLink to='/createList'>
                    <Button
                        title={'Create List'}
                    />
                </NavLink>
            </div>
            <div className="header__search col-12 col-md-3">
                <Search value={value} onSearch={onSearch}/>
            </div>
        </header>
    );
}

export default Header;