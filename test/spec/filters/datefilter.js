'use strict';

describe( 'Filter: DateFilter', function( ) {

  // load the filter's module
  beforeEach( module( 'stitchWeatherApp' ) ) ;

  // initialize a new instance of the filter before each test
  var DateFilter ;
  beforeEach( inject( function( $filter ) {
    DateFilter = $filter( 'date' ) ;
  } ) );

  it( 'should return a formatted date string: ', function( ) {
    var input = '1437915550' ;
    expect( DateFilter( input ) ).toBe( 'Sunday 26.7' ) ;
  } ) ;


});
