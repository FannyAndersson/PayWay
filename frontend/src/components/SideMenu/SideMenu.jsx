import React from "react";
import { SideNav, SideNavItem, Button, Icon } from "react-materialize";
import SideMenuItem from './SideMenuItem';
import LogoutBtn from '../Logout/LogoutBtn';

const SideMenu = props => {
	const user = props.user;
	return (
		<React.Fragment>
			<SideNav
				trigger={
					<Button
						className={
							"toggle-sidemenu-btn " +
							(user !== "" ? "" : "hidden")
						}
					>
						<Icon>menu</Icon>
					</Button>
				}
				options={{ closeOnClick: true }}
			>
				<li className="sideMenu-user-info">
					<dl>
						<dd>Logged in as {user.name}</dd>
						<dd>Phone: {user.phone}</dd>
					</dl>
				</li>
				{/* We used Handmade component SideMenuItem to improve interaction with Router */}
				<SideMenuItem to="/send-money" icon="send" text="Send money" />
				<SideMenuItem to="/profile/transactions" icon="account_balance_wallet" text="Transactions" />
				<SideMenuItem to="/profile/children/" icon="favorite" text="Children" />
				<SideMenuItem to="/profile/children/add-child" icon="face" text="Add a child" />
				<SideMenuItem to="/profile/favorites" icon="stars" text="Favorites" />
				<SideMenuItem to="/profile/favorites/add-favorite" icon="star" text="Add a favorite" />
				<SideNavItem divider />

				<SideMenuItem to="/profile/settings" icon="account_box" text="Settings" />
				<LogoutBtn />
			</SideNav>
		</React.Fragment>
	);
};

export default SideMenu;
