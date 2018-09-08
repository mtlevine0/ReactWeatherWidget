import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Forecast from './components/Forecast';
import CityList from './components/CityList';

class App extends Component {

  constructor() {
    super();
    this.state = {
      cities: [
        {
          id: 420028902,
          name: "Columbus",
          coord: {
          lat: 39.9798,
          lon: -83.0408
          },
          country: "US"
        }
      ],
      forecasts: [
        {
          list: [],
          city: {}
        }
      ],
      forecast: {
        list: [],
        city: {}
      },
      zip: "",
      id: "420028902"
    }
  }

  componentWillMount = () => {
    this.setState((prevState, props) => {
      return  {
        id: prevState.cities[0].id
      }
    });
    this.fetchWeatherForecast(this.state.id);
  }

  fetchWeatherForecast = (id) => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?id="+id+"&units=imperial&appid=fa7f586dff339cb05e9d12dbcdab5e4b")
    .then(response => {
      if(!response.ok) throw Error("something went wrong!") 
      return response 
    })
    .then(response => response.json())
    .then(data => this.setState({ forecast: data }));
  }

  onSearhZip = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?zip="+this.state.zip+",us&units=imperial&appid=fa7f586dff339cb05e9d12dbcdab5e4b")
    .then(response => {
      if(!response.ok) throw Error("Something went wrong!");
      return response 
    })
    .then(response => response.json())
    .then(data => {
      this.setState((prevState, props) => { 
        return {        
          cities: [...prevState.cities, data.city]
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  onUpdateZip = (event) => {
    this.setState({
        zip: event.target.value
    });
  }

  selectCity = (city) => {
    this.fetchWeatherForecast(city.id);
    this.setState({
      id: city.id
    });
  }

  removeCity = (index) => {
    if(this.state.cities.length > 1) {
      this.setState((prevState, props) => {
        let cities = [...prevState.cities];
        cities.splice(index, 1);
        console.log(cities);
        let id = prevState.id;
        if(this.state.id === this.state.cities[index].id) {
          if(prevState.cities.length > 1 && index !== 0) {
            id = prevState.cities[index-1].id;
          } else {
            // id = cities[cities.length-1].id;
            id = cities[index+1].id;

          }
        }
        this.fetchWeatherForecast(id);
        return {
          cities: cities,
          id: id
        }
      });
    }
  }

  render() {
    const { forecast, cities, id } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Forecast data={forecast} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <CityList
            removeCity={this.removeCity}
            selectCity={this.selectCity} 
            activeCity={id} 
            data={cities}/>
          </div>
          <div className="col">
            <input type="text"
              onChange={this.onUpdateZip}
              value={this.state.zip} />
            <button 
              onClick={this.onSearhZip}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
