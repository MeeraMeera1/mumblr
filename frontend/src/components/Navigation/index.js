import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className="logged-in-links">
                <NavLink exact to="/dashboard">Home</NavLink>
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className="index-link">
                <NavLink exact to="/">Home Page</NavLink>
            </div>
        )
    }

    return (
        <ul>
            <li>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
