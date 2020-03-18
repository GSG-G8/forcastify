import React, { Component } from 'react';
import './App.css';
// import MyLocation from './components/MyLocation';

class App extends Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount() {
    fetch('http://ipinfo.io/?token=d5af9bf4091973')
      .then(res => res.json())
      .then(data =>
        fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=d81b7bb5d4ac4987810203542201703&q=${data.loc}&days=7`
        )
      )
      .then(result => result.json())
      .then(data2 => this.setState({ data: data2, loading: false }));
  }

  render() {
    const { loading, data } = this.state;
    if (loading) {
      return (
        <div>
          <h1>loading ... </h1>
        </div>
      );
    }
    if (data.length) {
      return <h1>Data not found</h1>;
    }

    const {
      data: { forecast: { forecastday } = {} },
    } = this.state;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Forcastify</h1>
        <div className="container">
          <div className="card">
            <div className="today">
              <div className="conditions">
                <div className="temp">
                  <p>{forecastday[0].day.avgtemp_c} &deg; F</p>
                </div>
                <div className="currentCond">
                  <p>
                    <span className="tags">Humitidy:</span>{' '}
                    {forecastday[0].day.avghumidity}%
                  </p>
                  <p>
                    <span className="tags">wind:</span>{' '}
                    {forecastday[0].day.maxwind_kph}k/h
                  </p>
                </div>
              </div>
              <div className="location">
                <h3> {data.location.name}</h3>
                <img src={forecastday[0].day.condition.icon} alt="s" />
              </div>
            </div>
            <div className="forcast">
              {forecastday.slice(1).map(day => (
                <div className="day" key={day.date_epoch}>
                  <div className="dayOfWeek">{day.date}</div>
                  <div className="forcastTemp">{day.day.avgtemp_c}</div>
                  <img
                    src={day.day.condition.icon}
                    alt="Icon Sunny"
                    className="icon-location icon-forcast"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
