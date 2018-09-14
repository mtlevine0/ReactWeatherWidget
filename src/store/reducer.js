const initialState = {
    cities: [],
    forecast: [],
    isAddCityLoading: false,
    isAddCityError: false,
    id: ""
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_CITY_STARTED":
            return {
                ...state,
                isAddCityLoading: action.isLoading
            };
        case "ADD_CITY_SUCCESS":
            return {
                ...state,
                isAddCityLoading: false,
                cities: [...state.cities, action.city],
                forecast: [...state.forecast, action.forecast],
            };
        case "ADD_CITY_FAILED":
            return {
                ...state,
                isAddCityLoading: false,
                isAddCityError: action.hasErroed
            };
        case "SELECT_CITY":
            return {
                ...state,
                id: action.id
            };
        case "REMOVE_CITY":
            let cities = [...state.cities];
            cities.splice(action.index, 1);
            return {
                ...state,
                cities: cities
            }
        default:
            return state;
    }
};

export default reducer;