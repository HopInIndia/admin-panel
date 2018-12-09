import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GoogleMap, Marker, OverlayView, DirectionsRenderer } from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'

class MapComponent extends Component {
	constructor(props){
		super(props)
		this.state = {
			directions: null
		}
		this.onCenterChanged = this.onCenterChanged.bind(this)
		this.onPlacesChanged = this.onPlacesChanged.bind(this)
	}
	onCenterChanged(){
		const bounds = this.refs.mapEl.getBounds()
		const positionObj = this.refs.mapEl.getCenter()
		const position = {
			lat: positionObj.lat(),
			lng: positionObj.lng()
		}
		this.props.onCenterChanged && this.props.onCenterChanged(position, bounds)
	}
	onPlacesChanged(){
		const places = this.refs.searchBoxEl.getPlaces();
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
		this.props.onPlacesChanged && this.props.onPlacesChanged(markerPositions)
	}
	componentDidMount(){
		if(this.props.directions){
			const DirectionsService = new window.google.maps.DirectionsService()
			DirectionsService.route({
				origin: new window.google.maps.LatLng(41.8507300, -87.6512600),
				destination: new window.google.maps.LatLng(41.8525800, -87.6514100),
				travelMode: window.google.maps.TravelMode.DRIVING,
				waypoints: [{
					location: new window.google.maps.LatLng(41.8525800, -87.6513100),
					stopover: true
				}]
			}, (result, status) => {
				if (status === window.google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: result,
					});
				} else {
					console.error(`error fetching directions ${result}`);
				}
			});
		}
	}
	render(){
		return (
			<GoogleMap
			ref="mapEl"
			options={this.props.mapOptions}
			center={this.props.center}
			defaultZoom={this.props.defaultZoom}
			defaultCenter={this.props.defaultCenter}
			onCenterChanged={this.onCenterChanged}
			>
			{
				this.props.showSearchBar && (
					<SearchBox
						ref="searchBoxEl"
						bounds={this.props.bounds}
						controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
						onPlacesChanged={this.onPlacesChanged}
					>
						<input
							type="text"
							placeholder={this.props.searchPlaceholder}
							style={{
								borderRadius: `0px`
							}}
						/>
					</SearchBox>
				)
			}
			{
				this.props.showOverlayPointer && (
					<div className="map-icon-container">
						<i className="map pin icon"></i>
					</div>
				)
			}
			{this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
			{this.props.showMarker && this.props.markerPosition && <Marker position={this.props.markerPosition} />}
			</GoogleMap>
		)
	}
}

export default connect(state => (
	{ ...state.user }
))(MapComponent)