'use strict';

/**
 * @ngdoc function
 * @name stitchWeatherApp.controller:ForecastCtrl
 * @description

 * # ForecastCtrl
 * Controller of the stitchWeatherApp
 */
angular.module( 'stitchWeatherApp' )
  .controller( 'ForecastCtrl', [ 'AppConfig', 'ForecastService', 'Utils', '$scope', '$q',
  	function( AppConfig, ForecastService, Utils, $scope, $q ) {

    var self = this ;
    self.loading = true ;
    self.todayData = {} ;
    self.forecastData = {} ;
    self.unit = AppConfig.DEFAULT_UNIT ;


    /**
     * Changes the temperature unit
     * @param {string} unit - The new unit to be used.
     */
  	self.updateUnit = function( unit ) {
  		if( unit === self.unit ) { return ; }
  		// check if the new unit  is on the list of acceptable values
  		if( AppConfig.UNITS.indexOf( unit.toUpperCase( ) ) !== -1 ) {
  			
  			Utils.log( 'ForecastCtrl.updateUnit: ' + unit ) ;
  			self.retrieveForecastData( $scope.location, unit )
  				.then( function( ) {
  					self.unit = unit.toUpperCase( ) ;
  				}, function( error ) {
  					self.errorMessage = error ;
  				}
  			) ;
  		}
  	} ;


  	/**
     * Changes the temperature unit
     * @param {object} location - Object containing the coordinates and formatted address of the new location.
     * @param {string} unit - The unit to be used.
     */
  	self.retrieveForecastData = function( location, unit ) {
  		self.loading = true ;

  		return $q( function( resolve, reject ) {
	  		ForecastService.getForecastDataForCoordinates( location.coords, unit ) 
				.then( function( data ) {
					self.todayData = data.list[0] ;
	  			self.forecastData = data.list.splice( 1, data.list.length - 1 ) ;
	  			self.loading = false ;
	  			resolve( data ) ;
				}, function( error ) {
					self.forecastFailHandler( error ) ;
					reject( error ) ;
				} 
		  	) ;
		} ) ;
  	} ;


  	/**
     * Handles the errors returned by ForecastService
     * @param {object} error - The error message returned by the service.
     */
  	self.forecastFailHandler = function( error ) {
  		Utils.log( 'ForecastCtrl.forecastFailHandler: error: ' + error ) ;
  		self.errorMessage = error ;
  	} ;


  	/**
     * Handles the location update notification.
     * @param {object} location - Object containing the coordinates and formatted address of the new location.
     */
  	$scope.$on( AppConfig.events.LOCATION_UPDATED, function( event, location ) { 
  		Utils.log( 'ForecastCtrl: received location update: ' + location.address ) ; 
  		self.retrieveForecastData( location, self.unit ) ;
  	} ) ;


  } ] ) ;
