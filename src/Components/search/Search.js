/** @format */

import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, API_URL_GEO } from "../../api";

const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);

	function handleOnchage(searchData) {
		setSearch(searchData);
		onSearchChange(searchData);
	}

	function loadOptions(inputValue) {
		return fetch(
			`${API_URL_GEO}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name} ${city.countryCode}`,
                        }
                    })
                }
            })
			.catch((err) => console.error(err));
	}

	return (
		<div className="grid justify-items-center">

		<AsyncPaginate
			placeholder="Search for city"
			debounceTimeout={600}
			value={search}
			onChange={handleOnchage}
			loadOptions={loadOptions}
            className="md:w-3/4 lg:w-1/2"
			/>
			</div>
	);
};

export default Search;
