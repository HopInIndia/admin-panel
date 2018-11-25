import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

class Sidebar extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
	render(){
		const { isExpanded } = this.props
		if(!isExpanded) return null
		return (
			<div className="sidebar">
				<div className="ui vertical menu">
					<div className="logo-container">
						<h2>HopIn Admin Panel</h2>
					</div>
					<a className="active teal item">
						Dashboard
						<div className="ui teal left pointing label">1</div>
					</a>
					<a className="item">
						Schools
					</a>
					<a className="item">
						Routes
					</a>
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