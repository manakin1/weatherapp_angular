'use strict';

/**
 * @ngdoc filter
 * @name stitchWeatherApp.filter:capitalizeFirst
 * @function
 * @description
 * # capitalizeFirst
 * Filter in the stitchWeatherApp.
 */
angular.module( 'stitchWeatherApp' )
  .filter( 'capitalizeFirst', function( ) {

  	/**
     * Capitalizes the first letter of a string.
     * @param {string} input - The value to be filtered.
     */
    return function( input ) {
    	if( !input ) { return '' ; } 
      	return input.charAt( 0 ).toUpperCase( ) + input.slice( 1 ) ; 
    } ;

  } ) ;
