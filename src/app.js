import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom';
import { getAccessToken, userInfo } from '~/redux/actions/user'
import Login from '~/views/Login'
import Main from '~/views/Main'

const AuthRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			isLoading: true
		}
	}
	async componentDidMount(){
		const refreshToken = window.localStorage.getItem('refreshToken')
		if(!this.props.user.isLoggedIn && refreshToken){
			const accessToken = await getAccessToken(refreshToken)
			if(accessToken){
				this.props.dispatch(userInfo(accessToken))				
			}
		}
		this.setState({
			isLoading: false
		})
	}
	render(){
		const { isLoggedIn } = this.props.user
		const { isLoading } = this.state
		
		if(isLoading) return null

		return (
			<HashRouter>
				<div
					id="main-wrapper"
					data-theme="light"
					data-layout="vertical"
					data-sidebartype="full"
					data-sidebar-position="fixed"
					data-header-position="fixed"
					data-boxed-layout="full"
				>
					<Switch>
						<Route exact path='/' component={Login}  />
						<AuthRoute isLoggedIn={isLoggedIn} path='/*' component={Main}  />					
					</Switch>
				</div>
			</HashRouter>
		)
	}
}

export default connect(state => (
	{ ...state.user }
))(App)