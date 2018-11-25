import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

import './styles.css'

class School extends Component {
	constructor(props){
		super(props)
		this.state = {
			sidebarExpanded: true
		}
	}
	render(){
		return (
			<div className="schools">
				School
			</div>
			)
	}
}

export default connect(state => (
	{ ...state.user }
))(School)