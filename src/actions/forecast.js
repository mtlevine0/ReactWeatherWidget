export const forecastHasErrored = (bool) => {
    return {
        type: 'ADD_CITY_FAILED',
        hasErroed: bool
    }
}
	
export const forecastIsLoading = (bool) => {
    return {
        type: 'ADD_CITY_STARTED',
        isLoading: bool
    }
}

export const forecastHasLoaded = ({city, forecast}) => {
    return {
        type: 'ADD_CITY_SUCCESS',
        city,
        forecast
    }
}

export const forecastLoadData = (zip) => {
    return(dispatch) => {
        dispatch(forecastIsLoading(true));
        fetch("https://api.openweathermap.org/data/2.5/forecast?zip="+zip+",us&units=imperial&appid=fa7f586dff339cb05e9d12dbcdab5e4b")
            .then(response => {
            if(!response.ok) throw Error(response.body);
                return response;
            })
            .then(response => response.json())
            .then(data => {
                dispatch(forecastHasLoaded({city: data.city, forecast: data}));
            })
            .catch(error => {
                console.log(error);
                dispatch(forecastHasErrored(true));
                setTimeout(() => {
                    dispatch(forecastHasErrored(false));
                }, 5000);
            });
    }
}
