import React, { Component } from 'react'
import { Link, Route } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchDestinations } from '~/redux/actions/destination'

class ListDestinations extends Component {
	constructor(props){
		super(props)
		this.state = {
			sidebarExpanded: true,
			offset: 0,
			limit: 10
		}
	}
	async componentDidMount(){
		this.props.dispatch(fetchDestinations(this.state.offset, this.state.limit))
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
	{ ...state.destination }
))(ListDestinations)