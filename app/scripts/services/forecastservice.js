'use strict';

/**
 * @ngdoc service
 * @name stitchWeatherApp.forecastService
 * @description
 * # ForecastService
 * Service in the stitchWeatherApp.
 */
angular.module( 'stitchWeatherApp' )
  .factory( 'ForecastService', [ 'AppConfig', '$http', '$q', function( AppConfig, $http, $q ) {

  	return {

  		/**
	     * Retrieves weather data for the supplied coordinates from the forecast API.
	     * @param {object} coords - The coordinates of the specified location.
	     * @param {string} unit - The weather unit to be user. 
	     */
  		getForecastDataForCoordinates: function( coords, unit ) {

  			var query_str = AppConfig.FORECAST_API_URL +
	  			'lat=' + coords.latitude + 
	  			'&lon=' + coords.longitude +
	  			'&cnt=' + AppConfig.NUM_RESULTS +
	  			'&units=' + ( ( unit.toUpperCase( ) === 'C' ) ? 'metric' : 'imperial' ) ;

  			return $http.get( query_str )
  				.then( function( response ) {
  					if( typeof response.data === 'object' ) {
  						return $q.resolve( response.data ) ;
  					}

  					else { return $q.reject( AppConfig.errors.ERROR_FORECAST_API ) ; }
  				},

  				function( ) {
  					return $q.reject( AppConfig.errors.ERROR_FORECAST_API ) ;
  				} 
  			) ;
  		}

  	} ;
   
  } ] ) ;
