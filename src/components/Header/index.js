import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '~/redux/actions/user'
import './styles.css'

class Header extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
	render(){
		const { toggle } = this.props
		return (
			<div className={`header`}>
				<div className="ui primary menu">
					<a className="item" onClick={toggle}>
						<i className="align justify icon"></i>
					</a>
					<a className="item">Dashboard</a>
					<a className="item">Users</a>
					<div className="right menu">
						<a className="item" onClick={() => this.props.dispatch(logout())}>Logout</a>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => (
	{ ...state.user }
	))(Header)