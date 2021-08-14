import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';

import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlacesData } from './api/index';
import { useEffect, useState } from 'react';

function App() {
	const [places, setPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [chlidClicked, setChildClicked] = useState(null);

	const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		const filteredPlaces = places.filter((place) => place.rating > rating);
		setFilteredPlaces(filteredPlaces);
	}, [rating]);

	useEffect(() => {
		if (bounds.sw && bounds.ne) {
			setIsLoading(true);
			getPlacesData(type, bounds.ne, bounds.sw).then((data) => {
				setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
				setFilteredPlaces([]);
				setIsLoading(false);
			});
		}
	}, [type, bounds]);
	console.log(places);
	console.log(filteredPlaces);
	return (
		<>
			<CssBaseline />
			<Header setCoordinates={setCoordinates} />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List
						places={filteredPlaces.length ? filteredPlaces : places}
						chlidClicked={chlidClicked}
						isLoading={isLoading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coordinates={coordinates}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChildClicked={setChildClicked}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
