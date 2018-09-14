const initialState = {
    cities: [],
    forecast: [],
    isAddCityLoading: false,
    isAddCityError: {},
    id: ""
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_CITY_STARTED":
            console.log("[ADD CITY STARTED] zip: " + action.zip);
            return {
                ...state,
                isAddCityLoading: true
            };
        case "ADD_CITY_SUCCESS":
            console.log("[ADD CITY SUCCESS]");
            return {
                ...state,
                isAddCityLoading: false,
                cities: [...state.cities, action.city],
                forecast: [...state.forecast, action.forecast]
            };
        case "ADD_CITY_FAILED":
            console.log("[ADD CITY FAILED]");
            return {
                ...state,
                isAddCityLoading: false,
                isAddCityError: action.error
            };
        case "SELECT_CITY":
            console.log("[SELECT_CITY]");
            return {
                ...state,
                id: action.id
            };
        case "REMOVE_CITY":
            console.log("REMOVE_CITY");
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