/* 3rd party libraries */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { isEqual } from "lodash";
import { parse } from 'query-string';

/* Actions */
import { updateMap, getUserInfo, getRestaurants } from 'MapReducer';

/* Local libraries */
import Debouncer from "debouncer";
import markerContent from "markerContent";

export class MapComponent extends Component {
	constructor() {
		super();

		this.state = {
			map: null,
			markers: []
		};

		this.debouncer = Debouncer(
			2000,
			params => this.props.getRestaurants(...params),
			{ autoShutdown: false }
		);
	}

	componentWillMount() {
		const { getUserInfo } = this.props;

		getUserInfo();
	}

	componentWillUnmount() {
		this.debouncer.clearDebounce();
	}

	setMap(lat, lng) {
		const { updateMap } = this.props;
		const map = new google.maps.Map(
			document.getElementById('map'),
			{
				center: { lat, lng },
				zoom: 8
			}
		);

		map.addListener('center_changed', () => {
			const lat = map.getCenter().lat();
			const lng = map.getCenter().lng();

			this.debouncer.debounce([lat, lng]);
		});

		this.setState({ map });
		updateMap({
			currentLat: lat,
			currentLong: lng
		});
	}

	componentDidUpdate(prevProps) {
		if	(document.getElementById('map') && !this.state.map) {
			const { location: { search } } = this.props;
			let queryParams;

			try {
				queryParams = parse(search);
			} catch(error) {
				queryParams = {};
			}

			if ('lat' in queryParams && 'lng' in queryParams) {
				const lat = parseFloat(queryParams.lat);
				const lng = parseFloat(queryParams.lng);

				if (!isNaN(lat) && !isNaN(lng)) {
					this.setMap(lat, lng);
					this.debouncer.debounce([lat, lng]);
					return;	
				}
			}
			
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
					this.setMap(latitude, longitude);
				});
			} else {
				this.setMap(-34.905490, -56.181319);
			}
		} else {
			const { restaurants } = this.props;
			const { restaurants: prevRestaurants } = prevProps;

			Array.isArray(this.props.restaurants) &&
			this.props.restaurants.length &&
			!isEqual(restaurants, prevRestaurants) && this.updateMarkers();
		}
	}

	updateMarkers() {
		let { map, markers } = this.state;
		const { restaurants } = this.props;

		for(const marker of markers) {
			marker.setMap(null);
		}
		markers = [];

		for(const restaurant of restaurants) {
			const { name, coordinates } = restaurant;
			const coords = coordinates.split(',');
			const infowindow = markerContent(restaurant);
	
			const marker = new google.maps.Marker({
				position: { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]) },
				map,
				title: name
			});

			marker.addListener('click', function() {
				infowindow.open(map, marker);
			});

			markers.push(marker);
		}

		this.setState({ markers });
	}

	render() {
		const { name, currentLat, currentLong, restaurants } = this.props;

		if (!name) return <div className="loading">Loading...</div>;

		return (
			<>
				<div className="title">
					<h2>Welcome back {name}!</h2>
				</div>
				<div id="map"/>
			</>
		);
	}
}

const mS = ({ MapReducer }) => ({ ...MapReducer });

const mD = { updateMap, getUserInfo, getRestaurants };

export default connect(mS, mD)(MapComponent);