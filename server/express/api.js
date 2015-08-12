var api = function ( app, router ) {
  require( './api/users' )( app, router );
  require( './api/events' )( app, router );
  require( './api/steps' )( app, router );

  return router;
};


module.exports = api;