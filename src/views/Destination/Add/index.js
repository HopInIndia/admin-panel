import React, { Component } from 'react'
import { Link, Route } from "react-router-dom";
import { connect } from 'react-redux'
import GMap from '~/components/GMap'

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
			}
		}
		this.onPlacesChanged = this.onPlacesChanged.bind(this)
		this.onCenterChanged = this.onCenterChanged.bind(this)
	}
	onPlacesChanged(markerPositions){
		console.log(markerPositions)
		this.setState({
			centerPosition: markerPositions[0],
			markerPosition: markerPositions[0],
		})
	}
	onCenterChanged(location){
		// this.setState({
		// 	centerPosition: {
		// 		lat: location.lat(),
		// 		lng: location.lng(),
		// 	}
		// })
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
					<form className="ui form">
						<div className="field">
							<label>Destination Type</label>
							<select name="destinationType" placeholder="Destination Type">
								<option value="SCHOOL">School</option>
								<option value="COLLEGE">College</option>
								<option value="OFFICE">Office</option>
							</select>
						</div>
						<div className="field">
							<label>Title</label>
							<input type="text" name="title" placeholder="title" />
						</div>
						<div className="two fields">
							<div className="field">
								<label>Email</label>
								<input type="text" name="email" placeholder="Email" />
							</div>
							<div className="field">
								<label>Phone Number</label>
								<input type="text" name="phone" placeholder="Phone Number" />
							</div>
						</div>
						<div className="field">
							<label>Locate Destination</label>
							<GMap 
								defaultZoom={15}
								showMarker={true}
								showOverlayPointer={true}
								showSearchBar={true}
								searchPlaceholder={`Search for places`}
								center={this.state.centerPosition}
								defaultCenter={this.state.centerPosition}
								markerPosition={this.state.markerPosition}
								onCenterChanged={this.onCenterChanged}
								onPlacesChanged={this.onPlacesChanged}
							/>
						</div>
						<div className="field">
							<label>Address 1</label>
							<input type="text" name="address1" placeholder="Address 1" />
						</div>
						<div className="field">
							<label>Address 2</label>
							<input type="text" name="address2" placeholder="Address 2" />
						</div>
						<div className="three fields">
							<div className="field">
								<label>State</label>
								<input type="text" name="state" placeholder="State" />
							</div>
							<div className="field">
								<label>District</label>
								<input type="text" name="district" placeholder="District" />
							</div>
							<div className="field">
								<label>Zip Code</label>
								<input type="text" name="zipCode" placeholder="Zip Code" />
							</div>
						</div>
						<button className="ui button" type="submit">Submit</button>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(state => (
	{ ...state.user }
))(AddDestination)