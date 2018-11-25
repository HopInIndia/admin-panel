import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

import './styles.css'

class Main extends Component {
	constructor(props){
		super(props)
		this.state = {
			sidebarExpanded: true
		}
	}
	render(){
		return (
			<div className="main">
				<Header isExpanded={this.state.sidebarExpanded} toggle={() => this.setState({sidebarExpanded: !this.state.sidebarExpanded})} />
				<Sidebar isExpanded={this.state.sidebarExpanded} />
			</div>
			)
	}
}

export default connect(state => (
	{ ...state.user }
))(Main)