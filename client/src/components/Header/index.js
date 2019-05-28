import React from 'react';
import {connect} from 'react-redux';
import {followLink} from "../../actions/AC/headerLink";

import Button from '../Button'
import Search from '../Search'
import logo from "./hand-drawn-pencil-icon.png";

import './header.scss'
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

Header.propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    openRoot:PropTypes.string.isRequired,
    followLink: PropTypes.func.isRequired
};

function Header (props) {
        const {value, onSearch, openRoot, followLink} = props;
    return (
            <header className='row p-2 mb-3'>
                <div className='header__logo mb-2 col-2 col-md-6 col-xl-4 align-content-center'>
                    <img className='header__logo-img' alt='pencil-logo' src={logo}/>
                    <span className='header__logo-txt d-none d-md-inline-block'>WIRED-KEEPER</span>
                </div>
                <div className="header__buttons col-10 col-md-6 justify-content-end d-flex col-xl-3">

                    <NavLink
                        style={{color: 'grey'}}
                        activeStyle={{color: 'black'}}

                        to={openRoot === '/createNote' ? '/' :'/createNote'}
                        onClick={()=>followLink('/createNote',openRoot)}
                    >
                        <Button
                            title={'Create Note'}
                        />
                    </NavLink>
                    <NavLink
                        style={{color: 'grey'}}
                        activeStyle={{color: 'black'}}
                        to={openRoot === '/createList' ? '/' :'/createList'}
                        onClick={()=>followLink('/createList',openRoot)}
                    >
                        <Button
                            title={'Create List'}
                        />
                    </NavLink>
                </div>
                <div className='col-6 col-md-3 col-xl-2'>
                </div>
                <div className="header__search col-6 col-md-9 col-xl-3">
                    <Search value={value} onSearch={onSearch}/>
                </div>
            </header>
        );
}
const mapStateToProps = (state) => {
    return {
        openRoot: state.headerLink.openRoot
    };
}

const mapDispatchToProps = (dispatch) => {
  return{
      followLink: (link,currentRoot)=>dispatch(followLink(link, currentRoot)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);