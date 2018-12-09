import _ from 'lodash'
import { promisify } from 'bluebird'
import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import { withScriptjs, withGoogleMap } from 'react-google-maps'

import MapComponent from './MapComponent'

const RenderMap = withScriptjs(withGoogleMap((props) => {
		return <MapComponent {...props} />
	}
))


class GMap extends Component {
	constructor(props){
		super(props)
		this.state = {
			sidebarExpanded: true,
		}
		this.mapOptions = _.merge({}, this.props.mapOptions, {
			panControl: false,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			fullscreenControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			rotateControl: false
		})
	}
	render(){
		return (
			<div id="gmap">
				<RenderMap
				  {...this.props}
				  mapOptions={this.mapOptions}
				  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwXLYKEHcANPRRNLc_VGTrGdZtZzSBIUg&v=3.exp&libraries=geometry,drawing,places"
				  loadingElement={<div style={{ height: `100%` }} />}
				  containerElement={<div style={{ height: `400px`, position: `relative` }} />}
				  mapElement={<div style={{ height: `100%` }} />}
				/>
			</div>
			)
	}
}

export const getLocationAddress = async (latLng) => {
	return new Promise((resolve, reject) => {
		const geocoder = new window.google.maps.Geocoder()
		geocoder.geocode({
			'latLng': latLng
		}, (result, status) => {
			return (status === 'OK' && result[0]) ? resolve(result[0]) : reject()
		})		
	})
}

export default connect(state => (
	{ ...state.user }
))(GMap)