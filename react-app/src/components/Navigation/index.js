import React, { useState, useEffect, useRef }  from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);


	return (
	<ul className="nav-bar">
		<li className="nav-item">
		  <NavLink exact to="/" className="nav-link">Home</NavLink>
		</li>

		<li className="nav-item">
		  <ProfileButton user={sessionUser} className="nav-link" />
		</li>
	  </ul>
	);
}

export default Navigation;
