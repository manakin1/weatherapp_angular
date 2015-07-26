'use strict';

/**
 * @ngdoc function
 * @name stitchWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stitchWeatherApp
 */
angular.module( 'stitchWeatherApp' )
  .controller( 'MainCtrl', [ 'AppConfig', 'LocationService', 'Utils', '$routeParams', '$scope', '$q', '$location', 
  	function( AppConfig, LocationService, Utils, $routeParams, $scope, $q, $location ) {

  	var self = this ;
	self.errorMessage = '' ;
	self.locationEditMode = false ;
	self.customLocation = '' ;

	// location needs to be attached to $scope in order to be accessible to child controllers
	$scope.location = {} ;
  	

  	/**
     * Retrieves the user's geocoded location from LocationService
     */
  	self.resolveUserLocation = function( ) {

  		return $q( function( resolve, reject ) {
	  		LocationService.getUserLocationAsCoordinates( )
	  			.then( function( location ) {
	  				Utils.log( 'MainCtrl.resolveUserLocation: retrieved user coordinates: ' + location.coords ) ;	
	  				var coords = { latitude: location.coords.latitude, longitude: location.coords.longitude } ;

	  				LocationService.getLocationFromCoordinates( coords ) 
		  				.then( function( location ) {
		  					Utils.log( 'MainCtrl.resolveUserLocation: retrieved user address: ' + location.address ) ;
		  					resolve( location ) ;
		  					
		  				}, function( error ) {
		  					reject( error ) ;
		  				}
	  				) ;

	  			}, function( error ) {
	  				reject( error ) ;
	  			}
	  		) ;
		  	
  		} ) ;
  	} ;


  	/**
     * Resolves a custom location input by the user
     * @param {string} address - The new location.
     */
  	self.resolveCustomLocation = function( address ) {
  		Utils.log( 'MainCtrl.resolveCustomLocation: ' + address ) ;	

  		return $q( function( resolve, reject ) {
	  		LocationService.getLocationFromAddress( address )
  				.then( function( data ) {
  					resolve( data ) ;
  				}, function( error ) {
  					reject( error ) ;
  				}
  			) ;
  		} ) ;
  	} ;


  	/**
     * Handles the event where a custom location has been entered by the user.
     * @param {string} address - The new location.
     */
  	self.customLocationEnteredHandler = function( address ) {
  		Utils.log( 'MainCtrl.customLocationEnteredHandler: ' + address ) ;

  		self.resolveCustomLocation( address )
			.then( function( location ) {
		  		self.locationUpdatedHandler( location ) ;
		  		self.locationEditMode = false ;
		  		self.customLocation = location.address ;
		  		$location.path( '/' + encodeURIComponent( address ), false ) ;
		  	}, function( error ) {
		  		self.locationLookupFailHandler( error ) ;
		  	} 
	  	) ;
  	} ;


  	/**
     * Handles the successful location update.
     * @param {object} location - Object containing the coordinates and formatted address of the new location.
     */
  	self.locationUpdatedHandler = function( location ) {
  		Utils.log( 'MainCtrl.locationUpdatedHandler: ' + location.address ) ;
  		$scope.location = location ;
  		self.errorMessage = '' ;
      // broadcast the event so that child controllers can update their data accordingly
  		$scope.$broadcast( AppConfig.events.LOCATION_UPDATED, location ) ;
  	} ;


  	/**
     * Handles the errors returned by LocationService
     * @param {object} error - The error message returned by the service.
     */
  	self.locationLookupFailHandler = function( error ) {
  		Utils.log( 'MainCtrl.locationLookupFailHandler: error: ' + error ) ;
  		self.errorMessage = error ;
  	} ;


  	// resolve the correct method for looking up the address depending on whether an address can be found in the route parameters
  	// i.e. http://localhost:9000/#/sydney
  	var locationLookupMethod = $routeParams.location ? self.resolveCustomLocation : self.resolveUserLocation ;
  	var address = $routeParams.location || null ;

  	locationLookupMethod.call( null, address )
		.then( function( location ) {
	  		self.locationUpdatedHandler( location ) ;
	  	}, function( error ) {
	  		self.locationLookupFailHandler( error ) ;
	  	} 
  	) ;
	
  } ] ) ;
