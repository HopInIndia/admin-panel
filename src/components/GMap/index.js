import _ from 'lodash'
import { promisify } from 'bluebird'
import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView } from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    ref={el => this.mapEl = el}
  	options={props.mapOptions}
    center={props.center}
    defaultZoom={props.defaultZoom}
    defaultCenter={props.defaultCenter}
    onCenterChanged={() => {
    	const bounds = this.mapEl.getBounds()
    	const positionObj = this.mapEl.getCenter()
    	const position = {
    		lat: positionObj.lat(),
    		lng: positionObj.lng()
    	}
    	props.onCenterChanged && props.onCenterChanged(position, bounds)
    }}
  >
    <SearchBox
    	ref={el => this.searchBoxEl = el}
		bounds={props.bounds}
		controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
		onPlacesChanged={() =>  {
			const places = this.searchBoxEl.getPlaces();
			const bounds = new window.google.maps.LatLngBounds();

			places.forEach(place => {
				if (place.geometry.viewport) {
					bounds.union(place.geometry.viewport)
				} else {
					bounds.extend(place.geometry.location)
				}
			});
			const markerPositions = places.map(place => ({
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng()
			}));
			props.onPlacesChanged && props.onPlacesChanged(markerPositions)
		}}
    >
    {
    	props.showSearchBar && (
		<input
			type="text"
			placeholder={props.searchPlaceholder}
			style={{
				borderRadius: `0px`
			}}
		/>
    	)
    }
    </SearchBox>
    {
    	props.showOverlayPointer && (
			<div className="map-icon-container">
				<i className="map pin icon"></i>
			</div>
    	)
    }
    {props.showMarker && props.markerPosition && <Marker position={props.markerPosition} />}
  </GoogleMap>
))


class GMap extends Component {
	constructor(props){
		super(props)
		this.state = {
			sidebarExpanded: true
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
				<MapComponent
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