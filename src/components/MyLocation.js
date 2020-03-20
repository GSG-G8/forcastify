import React, { Component } from 'react';

class MyLocation extends Component {
  state = {
    loading: true,
    city: '',
    coords: '',
  };

  componentDidMount() {
    fetch('http://ipinfo.io/?token=d5af9bf4091973')
      .then(res => res.json())
      .then(results =>
        this.setState({
          loading: false,
          city: results.city,
          coords: results.loc,
        })
      );
  }

  render() {
    const { city, loading, coords } = this.state;
    if (loading) {
      return <div>getting location...</div>;
    }
    return (
      <div>
        <h1>This is your location</h1>
        <div>You live in : {city}</div>
        <div>You coords is : {coords}</div>
      </div>
    );
  }
}

export default MyLocation;
