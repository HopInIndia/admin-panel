import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '~/redux/actions/user'
import './styles.css'

class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			loading: false
		}
		this.processLogin = this.processLogin.bind(this)
	}
	componentDidMount(){
		if(this.props.user.isLoggedIn){
			this.props.history.push("/dashboard")
		}
	}
	componentDidUpdate(){
		if(this.props.user.isLoggedIn){
			this.props.history.push("/dashboard")
		}
	}
	processLogin(event){
		event.preventDefault()
		const creds = {
			phone: this.phone.value,
			password: this.password.value
		}
		this.props.dispatch(login(creds))
	}
	render(){
		return (
			<div className="login-box">
				<div className="form-container">
					<form className="ui center form" onSubmit={this.processLogin}>
						<h2 className="ui center aligned icon header yellow ">
							<i className="circular lock icon"></i>
							HopIn - Admin Panel
						</h2>
						<div className="field">
							<label>Phone Number</label>
							<input type="text" placeholder="Phone Number" ref={i => this.phone = i} />
						</div>
						<div className="field">
							<label>Password</label>
							<input type="password" placeholder="Password" ref={i => this.password = i} />
						</div>
						<div className="text-center">
							<button className={"ui yellow button " + (this.state.loading ? 'loading' : '')} type="submit">Login</button>
						</div>
					</form>
				</div>
			</div>
			)
	}
}

export default connect(state => (
	{ ...state.user }
))(Login)