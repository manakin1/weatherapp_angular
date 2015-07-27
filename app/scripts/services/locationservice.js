'use strict';

/**
 * @ngdoc service
 * @name stitchWeatherApp.locationService
 * @description
 * # locationService
 * Service in the stitchWeatherApp.
 */
angular.module( 'stitchWeatherApp' )
  .factory( 'LocationService', [ 'AppConfig', '$http', '$q', function( AppConfig, $http, $q ) {


    /**
     * Creates an address object from JSON data containing the coordinates and formatted address.
     * @param {object} data - The data object returned by the forecast API.
     * @return {object} - An object containing the coordinates and formatted address.
     */
    var createLocationObject = function( data ) {
      return {
        coords: { latitude: data.geometry.location.lat, longitude: data.geometry.location.lng },
        address: data.formatted_address
      } ;
    } ;
 

  	return {

      /**
       * Returns the user's location.
       */
  		getUserLocationAsCoordinates: function( ) {
  			return $q( function( resolve, reject ) {

  				// check if browser supports geolocation
  				if( navigator.geolocation ) {
			  		navigator.geolocation.getCurrentPosition( function( position ) {
				      	resolve( position ) ;
				    }, function( ) {
				      //reject( AppConfig.errors.GEOLOCATION_FAIL ) ;
              resolve( { 'latitude' : 0, 'longitude' : 0 } ) ;
				    } ) ;
	  			}

	  			else {
	  				// @TODO: fallback solution for browsers that don't support geolocation
	  				//reject( AppConfig.errors.GEOLOCATION_NOT_SUPPORTED ) ;
            resolve( { 'latitude' : 0, 'longitude' : 0 } ) ;
	  			}
	  		} ) ;
  		},


      /**
       * Retrieves location data for the supplied coordinates from Google API.
       * @param {object} coords - An object containing the latitude and longitude of the location.
       */
  		getLocationFromCoordinates: function( coords ) {
  			var query_str = AppConfig.GOOGLE_API_URL + 
  				AppConfig.GOOGLE_API_QUERY_GEOCODE_REVERSE + 
  				coords.latitude + ',' + coords.longitude ;
  	
  			return $http.get( query_str )
  				.then( function( response ) {
  					if( typeof response.data === 'object' ) {
  						if( response.data.results[1] ) {
                return createLocationObject( response.data.results[1] ) ;
  						}

  						else { return $q.reject( AppConfig.errors.GEOLOCATION_FAIL ) ; }
  					}

  					else { return $q.reject( AppConfig.errors.GEOLOCATION_FAIL ) ; }
  				},

  				function( response ) {
  					return $q.reject( response.data ) ;
  				} 
  			) ;
    	},


      /**
       * Retrieves location data for the supplied address from Google API.
       * @param {string} address - The location address as a string.
       */
      getLocationFromAddress: function( address ) {
        var query_str = AppConfig.GOOGLE_API_URL + 
          AppConfig.GOOGLE_API_QUERY_GEOCODE + 
          encodeURIComponent( address ) ;

        return $http.get( query_str )
          .then( function( response ) {
            if( typeof response.data === 'object' ) {

              if( response.data.results[1] ) {
                return createLocationObject( response.data.results[1] ) ;
              }

              else if( response.data.results[0] ) {
                return createLocationObject( response.data.results[0] ) ;
              }

              else { return $q.reject( AppConfig.errors.GEOLOCATION_FAIL ) ; }
            }

            else { return $q.reject( AppConfig.errors.GEOLOCATION_FAIL ) ; }
          },

          function( response ) {
            return $q.reject( response.data ) ;
          } 
        ) ;
      }

  	} ;

  } ] ) ;
