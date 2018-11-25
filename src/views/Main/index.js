import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

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
				<Header isExpanded={this.state.sidebarExpanded} toggle={() => this.setState({sidebarExpanded: !this.state.sidebarExpanded})} />
				<Switch>
					<Route path='/school' component={School} />
				</Switch>
			</React.Fragment>
			)
	}
}

export default connect(state => (
	{ ...state.user }
))(Main)