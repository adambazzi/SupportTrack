import React, { useState, useEffect, useRef }  from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateTicketModal from '../CreateTicketModal';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>

			<li>
				<ProfileButton user={sessionUser} />
			</li>
			<li>
				<OpenModalButton
					buttonText="Create Ticket"
					onItemClick={closeMenu}
					modalComponent={<CreateTicketModal user={sessionUser} />}
        		/>
			</li>
		</ul>
	);
}

export default Navigation;
