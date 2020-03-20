import React, { Component } from 'react';

class MyLocation extends Component {
  state = {
    loading: true,
    city: '',
  };

  componentDidMount() {
    fetch('http://ipinfo.io/?token=d5af9bf4091973')
      .then(res => res.json())
      .then(results =>
        this.setState({
          loading: false,
          city: results.city,
        })
      );
  }

  render() {
    const { city, loading } = this.state;
    if (loading) {
      return <div>getting location...</div>;
    }
    return (
      <div>
        <div>You live in : {city}</div>
      </div>
    );
  }
}

export default MyLocation;
