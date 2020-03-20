import React, { Component } from 'react';
import './App.css';
import MyLocation from './components/MyLocation';
import Loading from './components/Loading';
import Search from './components/Search';
import performSearch from './components/performSearch';
import handleErrors from './components/handleErorrs';

class App extends Component {
  state = {
    loading: true,
    data: [],
    search: '',
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

  handleSearch = e => {
    const { search } = this.state;
    e.preventDefault();
    performSearch(search)
      .then(handleErrors)
      .then(resData => {
        this.setState({
          data: resData,
          loading: false,
        });
      })
      .catch(err => console.log('not existed', err.message));
  };

  handleChange = e => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    const { loading, data } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (data.length) {
      return (
        <div>
          <div className="container">
            <div className="card">
              <h1>Data not Found</h1>
            </div>
          </div>
        </div>
      );
    }

    const {
      data: { forecast: { forecastday } = {} },
    } = this.state;
    // const forecastday = this.state.data.forecast.forecastday || {};
    const { search } = this.state;
    return (
      <div>
        <div className="container">
          <div className="card">
            <h1 style={{ textAlign: 'center' }}>FORECASTIFY</h1>
            <MyLocation />
            <Search
              handleSearch={this.handleSearch}
              handleChange={this.handleChange}
              search={search}
              placeholder="look for another city"
            />
            <div className="today">
              <div className="conditions">
                <div className="temp">
                  <p>{forecastday[0].day.avgtemp_c} &deg; C</p>
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
