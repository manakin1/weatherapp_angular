'use strict';

/**
 * @ngdoc service
 * @name stitchWeatherApp.utils
 * @description
 * # utils
 * Service in the stitchWeatherApp.
 */
angular.module( 'stitchWeatherApp' )
  .service( 'Utils', [ 'AppConfig', function( AppConfig ) {
    
  	return {

  		/**
	     * Logs a message in the console if AppConfig.DEBUG is set to true.
	     * @param {string} msg - The message to be logged.
	     */
  		log: function( msg ) {
  			if( AppConfig.DEBUG ) {
  				console.log( '---------- ' + msg ) ;
  			}
  		},

  		/**
	     * Capitalizes the first letter of a string.
	     * @param {string} str - The string to be capitalized.
	     */
  		capitalizeFirst: function( str ) {
  			return str.charAt( 0 ).toUpperCase( ) + str.slice( 1 ) ;
  		}

  	} ;

  } ] ) ;
