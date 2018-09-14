import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import Forecast from './components/Forecast';
import CityList from './components/CityList';

class App extends Component {

  state = {
    zip: ""
  }

  componentWillMount = () => {

  }

  onAddCity = (zip) => {
    this.props.onAddCityStarted(this.state.zip);
    fetch("https://api.openweathermap.org/data/2.5/forecast?zip="+this.state.zip+",us&units=imperial&appid=fa7f586dff339cb05e9d12dbcdab5e4b")
      .then(response => {
        if(!response.ok) throw Error(response.body);
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.props.onAddCitySuccess({city: data.city, forecast: data});
      })
      .catch(error => {
        console.log(error);
        this.props.onAddCityFailed(error);
      });
  }

  onUpdateZip = (event) => {
    this.setState({
        zip: event.target.value
    });
  }

  selectCity = (city) => {
    console.log(city.id);
    console.log(this.props.forecast);
    this.props.onSelectCity(city.id);
  }

  removeCity = (index) => {
    this.props.onRemoveCity(index);
  }

  render() {
    const isInitialized = (this.props.id !== "");
    return (
      <div className="container">
        <div className="row">
          <div className="col">
          {isInitialized ? 
                    (<Forecast
                    id={this.props.id}
                    data={this.props.forecast} />) : (<div>Nothing here!</div>)
          }
          </div>
        </div>
        <div className="row">
          <div className="col">
            <CityList
              removeCity={this.removeCity}
              selectCity={this.selectCity} 
              activeCity={this.props.id} 
              data={this.props.cities}/>
          </div>
          <div className="col">
            <input type="text"
              onChange={this.onUpdateZip}
              value={this.props.zip} />
            <button 
              onClick={this.onAddCity}>
              Add
            </button>
          </div>
        </div>
        {this.props.isAddCityLoading ? (<div>Loading city!</div>) : ("")}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    id: state.id,
    forecast: state.forecast,
    isAddCityLoading: state.isAddCityLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCityStarted: (zip) => dispatch({type: 'ADD_CITY_STARTED', zip: zip}),
    onAddCitySuccess: ({city, forecast}) => dispatch({type: 'ADD_CITY_SUCCESS', city: city, forecast: forecast}),
    onAddCityFailed: (error) => dispatch({type: 'ADD_CITY_FAILED', error: error}),
    onSelectCity: (id) => dispatch({type: "SELECT_CITY", id: id}),
    onRemoveCity: (id) => dispatch({type: "REMOVE_CITY", index: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
