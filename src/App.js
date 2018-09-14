import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import Forecast from './components/Forecast';
import CityList from './components/CityList';
import * as actionType from './actions/forecast';

class App extends Component {

  constructor() {
    super();
    this.state = {
      zip: ""
    }
  }

  onUpdateZip = (event) => {
    this.setState({
        zip: event.target.value
    });
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
              removeCity={this.props.onRemoveCity}
              selectCity={(city) => this.props.onSelectCity(city.id)} 
              activeCity={this.props.id} 
              data={this.props.cities}/>
          </div>
          <div className="col">
            <input type="text"
              onChange={this.onUpdateZip}
              value={this.props.zip} />
            <button 
              onClick={() => this.props.fetchForecast(this.state.zip)}>
              Add
            </button>
          </div>
        </div>
        {this.props.isAddCityLoading ? (<div>Loading city!</div>) : ("")}
        {this.props.isAddCityError ? (<div>Error Loading City!</div>) : ("")}
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
    isAddCityError: state.isAddCityError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectCity: (id) => dispatch({type: "SELECT_CITY", id: id}),
    onRemoveCity: (id) => dispatch({type: "REMOVE_CITY", index: id}),
    fetchForecast: (zip) => dispatch(actionType.forecastLoadData(zip))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
