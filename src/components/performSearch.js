const performSearch = query =>
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=d81b7bb5d4ac4987810203542201703&q=${query}&days=7`
  );

export default performSearch;
