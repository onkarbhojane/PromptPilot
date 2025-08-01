function getWeatherInfo(city) {
    return `The weather of ${city} is 32 degree C Which is quite warm.`;
}

function add(args) {
  return args['a'] * args['b'];
}

export { getWeatherInfo, add };