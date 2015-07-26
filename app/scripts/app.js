'use strict';

/**
 * @ngdoc overview
 * @name stitchWeatherApp
 * @description
 * # stitchWeatherApp
 *
 * Main module of the application.
 */
angular
  .module( 'stitchWeatherApp', [
    'ngRoute'
  ] )
  .config( [ '$routeProvider', function( $routeProvider ) {
    
    $routeProvider
      .when( '/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      } )
      .when( '/:location', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      } )
      .otherwise( {
        redirectTo: '/'
      } ) ;




  } ] )
  .run( ['$route', '$rootScope', '$location', function( $route, $rootScope, $location ) {
      var original = $location.path ;
      $location.path = function( path, reload ) {
          if( reload === false ) {
              var lastRoute = $route.current ;
              var un = $rootScope.$on('$locationChangeSuccess', function( ) {
                  $route.current = lastRoute ;
                  un( ) ;
              } ) ;
          }
          return original.apply( $location, [path] ) ;
  } ;
} ] ) ;
