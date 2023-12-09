import React, { useEffect } from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateManager/StateProvider';
import { GetUser } from '../App';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Header() {


    return (
        <div className="header">
            <img 
                className="header__logo"
                src="http://pngimg.com/uploads/hummingbird/hummingbird_PNG66.png"
                alt=""
            />
            
            <div className="header__search" >
            </div>

            <div className="header__nav">
                
                <Link to="/login">
                        <div className="header__option">
                        <span className="header__optionLineTwo"> Sign in </span>
                        </div>
                </Link>

            </div>
        </div>
    )
}

export default Header
