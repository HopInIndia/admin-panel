import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
	render(){
		return (
			<div className="dashboard">
				Dashboard
			</div>
		)
	}
}

export default connect(state => (
	{ ...state.user }
))(Dashboard)