import React, { Component } from 'react'
import { Link, Route } from "react-router-dom";
import { connect } from 'react-redux'
import './styles.css'

class Sidebar extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
	render(){
		const { isExpanded, match } = this.props
		return (
			<div className="app-sidebar full height">
				<div className={`ui sidebar inverted vertical menu left ${isExpanded ? 'visible' : ''}`}>
					<div className="logo-container">
						<h2>HopIn Admin Panel</h2>
					</div>
					<Link to='/dashboard' className={`teal item ${match.url.startsWith('/dashboard') ? 'active': ''}`} >
						Dashboard
						<div className="ui teal left pointing label">1</div>
					</Link>
					<Link to='/destinations' className={`item teal ${match.url.startsWith('/destinations') ? 'active': ''}`}>
						Destinations
					</Link>
					<Link to='/routes' className={`item teal ${match.url.startsWith('/routes') ? 'active': ''}`}>
						Routes
					</Link>
					<div className="item">
						<div className="ui transparent icon input">
							<input type="text" placeholder="Search mail..." />
							<i className="search icon"></i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => (
	{ ...state.user }
	))(Sidebar)