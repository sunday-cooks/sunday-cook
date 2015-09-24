var api = function ( app, router ) {
  require( './api/users' )( app, router );
  require( './api/events' )( app, router );
  require( './api/steps' )( app, router );
  require( './api/ingredients' )( app, router );

  return router;
};


module.exports = api;