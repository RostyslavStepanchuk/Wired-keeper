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
                <div className='header__logo mb-2 col-2 col-sm-6 col-lg-4 align-content-center'>
                    <img className='header__logo-img' alt='pencil-logo' src={logo}/>
                    <span className='header__logo-txt d-none d-sm-inline-block'>WIRED-KEEPER</span>
                </div>
                <div className="header__buttons col-10 col-sm-6 justify-content-end d-flex col-lg-4">

                    <NavLink

                        activeStyle={{fontWeight:'bold',fontStyle:'italic'}}

                        to={openRoot === '/createNote' ? '/' :'/createNote'}
                        onClick={()=>followLink('/createNote',openRoot)}
                    >
                        <Button
                            class='mr-2'
                            style={{color: 'black', backgroundColor:'#A0DBEF'}}
                            title={'Create Note'}
                        />
                    </NavLink>
                    <NavLink
                        style={{color: 'grey'}}
                        activeStyle={{fontWeight:'bold',fontStyle:'italic'}}
                        to={openRoot === '/createList' ? '/' :'/createList'}
                        onClick={()=>followLink('/createList',openRoot)}
                    >
                        <Button
                            style={{color: 'black', backgroundColor:'#A0DBEF'}}
                            title={'Create List'}
                        />
                    </NavLink>
                </div>
                <div className="header__search col-12 col-lg-4">
                    <Search value={value} onSearch={onSearch}/>
                </div>
            </header>
        );
}
const mapStateToProps = (state) => {
    return {
        openRoot: state.headerLink.openRoot
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
      followLink: (link,currentRoot)=>dispatch(followLink(link, currentRoot)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);