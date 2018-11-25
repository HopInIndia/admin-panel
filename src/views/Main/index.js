import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

import Dashboard from '~/views/Dashboard'
import School from '~/views/School'

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
			<React.Fragment>
				<Sidebar isExpanded={this.state.sidebarExpanded} {...this.props} />
				<div className={`${this.state.sidebarExpanded ? 'margin-left' : ''}`}>
					<Header toggle={() => this.setState({sidebarExpanded: !this.state.sidebarExpanded})} />
					<Switch>
						<Route exact path='/dashboard' component={Dashboard} />
						<Route exact path='/schools' component={School} />
					</Switch>
				</div>
			</React.Fragment>
			)
	}
}

export default connect(state => (
	{ ...state.user }
))(Main)