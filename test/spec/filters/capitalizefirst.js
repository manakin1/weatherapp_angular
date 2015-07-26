'use strict';

describe( 'Filter: CapitalizeFirst', function( ) {

  // load the filter's module
  beforeEach( module( 'stitchWeatherApp' ) ) ;

  // initialize a new instance of the filter before each test
  var CapitalizeFirst;
  beforeEach( inject( function( $filter ) {
    CapitalizeFirst = $filter( 'capitalizeFirst' ) ;
  } ) ) ;

  it( 'should return the input with the first letter capitalized: ', function( ) {
    var text = 'teststring' ;
    expect( CapitalizeFirst( text ) ).toBe( 'Teststring' ) ;
  } ) ;

} ) ;
