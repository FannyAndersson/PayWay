import React from "react";
import { SideNav, SideNavItem, Button, Icon } from "react-materialize";

const SideMenu = (props) => {
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
				<SideNavItem waves href="/profile/send-money" icon="send">Send money</SideNavItem>
				<SideNavItem waves href="/profile/transactions" icon="account_balance_wallet">Transactions</SideNavItem>
				
				<SideNavItem waves href="/profile/children/" icon="favorite">Children</SideNavItem>
				<SideNavItem waves href="/profile/children/add-child" icon="face">Add a child</SideNavItem>
				
				<SideNavItem waves href="/profile/favorites" icon="stars">Favorites</SideNavItem>
				<SideNavItem waves href="/profile/favorites/add-favorite" icon="star">Add a favorite</SideNavItem>
				
				<SideNavItem divider />
				<SideNavItem href="/profile/settings/" icon="account_box">
					Settings
				</SideNavItem>
				<SideNavItem waves href="/logout" icon="exit_to_app">
					Log out
				</SideNavItem>
			</SideNav>
		</React.Fragment>
	);
};

export default SideMenu;
