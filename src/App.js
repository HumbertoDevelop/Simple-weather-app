/** @format */

import React, { useState } from "react";
import CurrentWeather from "./Components/current-weather/CurrentWeather";
import Search from "./Components/search/Search";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Forecast from "./Components/forecast/forecast";

const App = () => {

	const [currentWeather, setCurrentWeather] = useState(null);
	const [currentForeCast, setForeCast] = useState(null);
	
	console.log(currentWeather);
	console.log(currentForeCast);
	
	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(" ");
		
		const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);

		const foreCastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
		
		Promise.all([currentWeatherFetch, foreCastFetch])
		.then(async (response) => {
			const weatherResponse = await response[0].json();
			const forecastResponse = await response[1].json();
		
			setCurrentWeather({city: searchData.label , ...weatherResponse});
			setForeCast({city: searchData.label, ...forecastResponse});
		})
		.catch((err) => {console.log(err)})
	};


	return (
		<div className="container">
			<Search onSearchChange={handleOnSearchChange} />
			{currentWeather && <CurrentWeather data={currentWeather} />}
      		{currentForeCast && <Forecast data={currentForeCast} />}
		</div>
	);
};

export default App;
