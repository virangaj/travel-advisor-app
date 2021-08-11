import axios from 'axios';

const URL =
	'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(URL, {
			params: {
				bl_latitude: sw.lat,
				tr_latitude: ne.lat,
				bl_longitude: sw.lng,
				tr_longitude: ne.lng,
			},
			headers: {
				'x-rapidapi-key': 'ef1ee68a41msh5ff79c260bdc0f7p1631f4jsn4b1125474efa',
				'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
			},
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};
