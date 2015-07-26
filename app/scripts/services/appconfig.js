'use strict';

/**
 * @ngdoc service
 * @name stitchWeatherApp.AppConfig
 * @description
 * # appconfig
 * Constant in the stitchWeatherApp.
 */
angular.module( 'stitchWeatherApp' )
  .constant( 'AppConfig', {

    DEBUG: true,

    // Google config
    GOOGLE_API_URL: 'https://maps.googleapis.com/maps/api/geocode/json?',
    GOOGLE_API_KEY: '',
    GOOGLE_API_QUERY_GEOCODE_REVERSE: 'latlng=',
    GOOGLE_API_QUERY_GEOCODE: 'address=',

    // Forecast.io config
    FORECAST_API_KEY: 'e425b3e1036aacf761e166571c6252b9',
    FORECAST_API_URL: 'http://api.openweathermap.org/data/2.5/forecast/daily?',

    DAYS: [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ],
    UNITS: [ 'C', 'F' ],
    DEFAULT_UNIT: 'C',
    NUM_RESULTS : 6,
    
    // events

    events: {
      'LOCATION_UPDATED' : 'Location updated'
    },

    // error messages

    errors: {
      'DEFAULT' : 'Something went wrong. Please try again.',
      'GEOLOCATION_NOT_SUPPORTED' : 'Geolocation not supported',
      'GEOLOCATION_FAIL' : 'Could not resolve your location.',
      'NO_LOCATION' : 'No location specified',
      'INVALID_PARAMS' : 'Invalid search parameters. Please try again.',
      'ERROR_GOOGLE_API' : 'Error parsing your location. Please try again.',
      'ERROR_FORECAST_API' : 'Error retrieving weather data for your location'
    }

  } ) ;
