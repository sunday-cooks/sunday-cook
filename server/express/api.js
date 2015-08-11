var api = function ( app, router ) {
  require( './api/users' )( app, router );

  return router;
};


module.exports = api;