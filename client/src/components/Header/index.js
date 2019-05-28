import React from 'react';

import Button from '../Button'
import Search from '../Search'
import logo from "./hand-drawn-pencil-icon.png";

import './header.scss'
import {NavLink} from "react-router-dom";
import NotationCatalog from "../NotationCatalog";
import PropTypes from "prop-types";

Header.propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    notationTypes: PropTypes.array.isRequired,
    handleType: PropTypes.func.isRequired,
    openRoot:PropTypes.string.isRequired,
    handleLinkClick:PropTypes.func.isRequired
};

function Header (props) {
        const {value, onSearch, notationTypes, handleType, handleLinkClick, openRoot} = props;
        return (
            <header className='row p-2 mb-3'>
                <div className='header__logo mb-2 col-2 col-md-6 col-xl-4 align-content-center'>
                    <img className='header__logo-img' alt='pencil-logo' src={logo}/>
                    <span className='header__logo-txt d-none d-md-inline-block'>WIRED-KEEPER</span>
                </div>
                <div className="header__buttons col-10 col-md-6 justify-content-end d-flex col-xl-3">

                    <NavLink
                        to={openRoot === '/createNote' ? '/' :'/createNote'}
                        onClick={()=>handleLinkClick('/createNote')}
                    >
                        <Button
                            title={'Create Note'}
                        />
                    </NavLink>
                    <NavLink
                        to={openRoot === '/createList' ? '/' :'/createList'}
                        onClick={()=>handleLinkClick('/createList')}
                    >
                        <Button
                            title={'Create List'}
                        />
                    </NavLink>
                </div>
                <div className='col-6 col-md-3 col-xl-2'>
                    <NotationCatalog
                        notationTypes={notationTypes}
                        handleType={handleType}
                    />
                </div>
                <div className="header__search col-6 col-md-9 col-xl-3">
                    <Search value={value} onSearch={onSearch}/>
                </div>
            </header>
        );
}


export default Header;