'use strict';

/**
 * @ngdoc filter
 * @name stitchWeatherApp.filter:date
 * @function
 * @description
 * # date
 * Filter in the stitchWeatherApp.
 */
angular.module( 'stitchWeatherApp' )
  .filter( 'date', [ 'AppConfig', 'Utils', function( AppConfig, Utils ) {

  	/**
     * Formats a date string.
     * @param {string} input - The value to be filtered.
     */
    return function( input ) {
	    if( !input ) { return '' ; } 
	  	var _date = ( new Date( input * 1000 ) ) ;
	  	var _weekday = Utils.capitalizeFirst( AppConfig.DAYS[ _date.getDay( ) ] ) ;
 
  		return _weekday + ' ' + _date.getDate( ) + '.' + ( _date.getMonth( ) + 1 ) ;
    } ;

  } ] ) ;
