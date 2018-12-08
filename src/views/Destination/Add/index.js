import React, { Component } from 'react'
import { Link, Route } from "react-router-dom";
import { connect } from 'react-redux'
import GMap, { getLocationAddress } from '~/components/GMap'

import { addDestination } from '~/redux/actions/destination'

class AddDestination extends Component {
	constructor(props){
		super(props)
		this.state = {
			sidebarExpanded: true,
			centerPosition: { 
				lat: -34.397,
				lng: 150.644
			},
			markerPosition: { 
				lat: -34.397,
				lng: 150.644
			},
			isProgress: false,
			error: null,
		}
		this.onPlacesChanged = this.onPlacesChanged.bind(this)
		this.onCenterChanged = this.onCenterChanged.bind(this)
		this.autoFillAddress = this.autoFillAddress.bind(this)
		this.fetchAddress = this.fetchAddress.bind(this)
		this.processAdd = this.processAdd.bind(this)
	}
	onPlacesChanged(markerPositions){
		console.log(markerPositions)
		this.setState({
			centerPosition: markerPositions[0],
			markerPosition: markerPositions[0],
		})
	}
	onCenterChanged(position){
		console.log(position)
		// this.setState({
		// 	centerPosition: position
		// })
	}
	async processAdd(event){
		event.preventDefault()
		this.setState({
			isProgress: true
		})
		const destinationData = {
			type: this.refs.type.value,
			name: this.refs.name.value,
			email: this.refs.email.value,
			phone: this.refs.phone.value,
			address: {
				address1: this.refs.address1.value,
				address2: this.refs.address2.value,
				district: this.refs.district.value,
				state: this.refs.state.value,
				zipCode: this.refs.zipCode.value,
			},
			locaton: {
				latitude: this.state.centerPosition.lat,
				longitude: this.state.centerPosition.lng,
			}
		}
		try{
			const addDestinationResponse = await this.props.dispatch(addDestination(destinationData))
			if(addDestinationResponse){
				this.setState({
					isProgress: false
				}, () => {
					this.props.history.push('/destinations')
				})
			}else{
				this.setState({
					isProgress: false,
					error: 'An error occured'
				})
			}
		}catch(error){
			this.setState({
				isProgress: false,
				error: 'An error occured'
			})
		}
	}
	async fetchAddress(){
		const address = {}
		try{
			const addressObj = await getLocationAddress(this.state.centerPosition)
			addressObj.address_components.map(addressComponent => {
				if(!address[addressComponent.types[0]]){
					address[addressComponent.types[0]] = []
				}
				address[addressComponent.types[0]].push(addressComponent.long_name)
			})
			this.setState({
				address: {
					address1: (`${address.premise ? address.premise.join(', ') : ''} ${address.route ? address.route.join(', ') : ''} ${address.political ? address.political.join(', ') :  ''}`).trim(),
					address2: address.locality ? address.locality.join(' ') : '',
					district: address.administrative_area_level_2 ? address.administrative_area_level_2.join(' ') : '',
					state: address.administrative_area_level_1 ? address.administrative_area_level_1.join(' ') : '',
					zipCode: address.postal_code ? address.postal_code.join(' ') : '',
				}
			})
			this.autoFillAddress()
		}catch(error){
			console.log(error)
		}
	}
	autoFillAddress(){
		if(this.state.address){
			for(let key in this.state.address){
				this.refs[key].value = this.state.address[key]
			}
		}
	}
	render(){
		return (
			<div className="add-new-destination">
				<div className="col-xs-12 col-sm-12 col-md-12">
					<h2 className="ui dividing header">
						<div className="content">
							Add New Destination
						</div>
					</h2>
				</div>
				<div className="col-xs-12 col-sm-8 col-md-8">
					<form className="ui form" onSubmit={this.processAdd}>
						<div className="field">
							<label>Destination Type</label>
							<select ref="type" name="type" placeholder="Destination Type">
								<option value="SCHOOL">School</option>
								<option value="COLLEGE">College</option>
								<option value="OFFICE">Office</option>
							</select>
						</div>
						<div className="field">
							<label>Name</label>
							<input ref="name" type="text" name="name" placeholder="Name" />
						</div>
						<div className="two fields">
							<div className="field">
								<label>Email</label>
								<input ref="email" type="text" name="email" placeholder="Email" />
							</div>
							<div className="field">
								<label>Phone Number</label>
								<input ref="phone" type="text" name="phone" placeholder="Phone Number" />
							</div>
						</div>
						<div className="field">
							<label>Locate Destination</label>
							<GMap 
								defaultZoom={15}
								showMarker={false}
								showOverlayPointer={true}
								showSearchBar={true}
								searchPlaceholder={`Search for places`}
								center={this.state.centerPosition}
								defaultCenter={this.state.centerPosition}
								markerPosition={this.state.markerPosition}
								onCenterChanged={this.onCenterChanged}
								onPlacesChanged={this.onPlacesChanged}
							/>
							<button className="ui button" type="button" onClick={this.fetchAddress}>Auto Fill from Map</button>
						</div>
						<div className="field">
							<label>Address 1</label>
							<input ref="address1" type="text" name="address1" placeholder="Address 1" />
						</div>
						<div className="field">
							<label>Address 2</label>
							<input ref="address2" type="text" name="address2" placeholder="Address 2" />
						</div>
						<div className="three fields">
							<div className="field">
								<label>State</label>
								<input ref="state" type="text" name="state" placeholder="State" />
							</div>
							<div className="field">
								<label>District</label>
								<input ref="district" type="text" name="district" placeholder="District" />
							</div>
							<div className="field">
								<label>Zip Code</label>
								<input ref="zipCode" type="text" name="zipCode" placeholder="Zip Code" />
							</div>
						</div>
						<div className="text-center">
							<button className={`ui button yellow ${this.state.isProgress ? 'loading' : ''}`} type="submit">Add Destination</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(state => (
	{ ...state.destination }
))(AddDestination)