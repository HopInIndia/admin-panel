import React, { Component } from 'react'
import { Link, Route } from "react-router-dom";
import { connect } from 'react-redux'

class ListDestinations extends Component {
	constructor(props){
		super(props)
		this.state = {
			sidebarExpanded: true
		}
	}
	render(){
		return (
			<div className="container">
				ListDestinations
			</div>
		)
	}
}

export default connect(state => (
	{ ...state.user }
))(ListDestinations)