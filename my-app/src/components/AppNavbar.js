import React, {Component} from 'react';
import Login from "./login";
import ReactDOM from 'react-dom';
import './css/appnavbar.css';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container
} from 'reactstrap';
import axios from "axios"
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class AppNavbar extends Component {
	componentDidMount()
	{
		console.log("called");
		var loginstat = localStorage.getItem("userid")
		if(loginstat){
			this.setState({isLogin:true})
			document.getElementById("logstat").innerHTML = "LogOut"
			document.getElementById("profile").innerHTML = "Profile"
		}
		else{
			this.setState({isLogin:false})
			document.getElementById("logstat").innerHTML = "LogIn"
		}
	}
	state = {
		isOpen: false
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
	
	changepage = () => {
		let checkstate = document.getElementById("logstat").innerHTML;
		if(checkstate==="LogIn"){
			ReactDOM.render(<Login />, document.getElementById('root'));
		}
		else{
			localStorage.clear();
			ReactDOM.render(<Login />, document.getElementById('root'));
		}
	}

	render(){
		return (
			<div id="nav">
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">MusicApp</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav id="rightnav" className="ml-auto" navbar>
								<Router>
									<NavItem className="navitem">
										<NavLink id="profile"></NavLink>
									</NavItem>
								</Router>
								<NavItem className="navitem">
									<NavLink id="logstat" onClick={this.changepage}></NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}


export default AppNavbar;