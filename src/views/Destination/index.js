import React, { Component } from 'react'
import { Link, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'

import ListDestinations from './List'
import AddDestination from './Add'

import './styles.css'

class Destination extends Component {
	constructor(props){
		super(props)
		this.state = {
			sidebarExpanded: true
		}
	}
	render(){
		return (
			<div id="destinations">
				<React.Fragment>
					<Switch>
						<Route exact path='/destinations' render={(props) => (
							<div className="container">
								<div className="row justify-content-end">
									<Link to="/destinations/add">
										<button className="ui button yellow">
											<i className="plus icon"></i>
											Add New Destination
										</button>
									</Link>
								</div>
								<ListDestinations {...props} />
							</div>
						)} />
						<Route exact path='/destinations/add' render={(props) => (
							<div className="container">
								<AddDestination {...props} />
							</div>
						)} />
					</Switch>
				</React.Fragment>
			</div>
			)
	}
}

export default connect(state => (
	{ ...state.user }
))(Destination)