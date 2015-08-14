var knex = require( 'knex' )( {
  client: 'postgres',
  connection: {
    host: process.env.pg_host,
    user: process.env.pg_user,
    password: process.env.pg_password,
    database: process.env.pg_database,
    charset: 'utf8',
  },
});

module.exports = db = require( 'bookshelf' )( knex );

/**
 * All models/collections will automatically register themselves.
 */

db.plugin( 'registry' );

/**
 * Users Table
 */


db.knex.schema.hasTable( 'users' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'users', function ( user ) {
      user.increments( 'id' ).primary();
      user.string( 'email', 100 ).unique();
      user.string( 'fb_id' ).unique(); // Facebook Profile Id
      user.string( 'first_name');
      user.string( 'last_name');
      user.string( 'gender' );
      user.timestamps();
    }).then( function ( table ) {
      process.verb( 'Created Table: users' );
    });
  }
});

/**
 * Ingredients Table
 */


db.knex.schema.hasTable( 'ingredients' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'ingredients', function ( ing ) {
      ing.increments( 'id' ).primary();
      ing.string( 'name', 100 );
      ing.string( 'description', 100 );
      ing.string( 'buy_url' );
    }).then( function ( table ) {
      process.verb( 'Created Table: ingredients' );
    });
  }
});

/**
 * Tools Table
 */

db.knex.schema.hasTable( 'tools' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'tools', function ( tool ) {
      tool.increments( 'id' ).primary();
      tool.string( 'name', 100 );
      tool.string( 'description', 100 );
      tool.string( 'buy_url' );
    }).then( function ( table ) {
      process.verb( 'Created Table: tools' );
    });
  }
});

/**
 * Events Table
 */

db.knex.schema.hasTable( 'events' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'events', function ( event ) {
      event.increments( 'id' ).primary();
      event.string( 'name' );
      event.string( 'description' );
      event.integer( 'user_id' );
      event.timestamps();
    }).then( function ( table ) {
      process.verb( 'Created Table: events' );
    });
  }
});

/**
 * Event Ingredients Table
 */

db.knex.schema.hasTable( 'events_ingredients' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'events_ingredients', function ( event_ing ) {
      event_ing.increments( 'id' ).primary();
      event_ing.integer( 'event_id' );
      event_ing.integer( 'ingredient_id' );
      event_ing.string( 'qty' );

    }).then( function ( table ) {
      process.verb( 'Created Table: events_ingredients' );
    });
  }
});

/**
 * Event Tools Table
 */

db.knex.schema.hasTable( 'events_tools' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'events_tools', function ( event_tool ) {
      event_tool.increments( 'id' ).primary();
      event_tool.integer( 'event_id' );
      event_tool.integer( 'tool_id' );

    }).then( function ( table ) {
      process.verb( 'Created Table: events_tools' );
    });
  }
});

/**
 * Event Steps Table
 */

db.knex.schema.hasTable( 'steps' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'steps', function ( step ) {
      step.increments( 'id' ).primary();

      step.integer( 'event_id' );
      step.string( 'name' );
      step.string( 'details' );
      step.integer( 'min_duration' );
      step.integer( 'max_duration' );

    }).then( function ( table ) {
      process.verb( 'Created Table: steps' );
    });
  }
});

/**
 * Steps Users Join Table
 * - This table is used to mark steps a user has completed.
 */

db.knex.schema.hasTable( 'steps_users' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'steps_users', function ( step_user ) {
      step_user.increments( 'id' ).primary();
      step_user.integer( 'step_id' );
      step_user.integer( 'user_id' );
      step_user.boolean( 'done' );

      step_user.timestamps();
    }).then( function ( table ) {
      process.verb( 'Created Table: steps_users' );
    });
  }
});

/**
 * Tips Table
 */

db.knex.schema.hasTable('tips' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'tips', function ( tip ) {
      tip.increments( 'id' ).primary();

      tip.integer( 'step_id' );
      tip.string( 'text' );

    }  ).then( function ( table ) {
      process.verb( 'Created Table: tips' );
    });
  }
});

/**
 * Step Ingredients Table
 */

db.knex.schema.hasTable('ingredients_steps' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'ingredients_steps', function ( ing_step ) {
      ing_step.increments( 'id' ).primary();
      ing_step.integer( 'ingredient_id' );
      ing_step.integer( 'step_id' );
      ing_step.string( 'qty' );

    }).then( function ( table ) {
      process.verb( 'Created Table: ingredients_steps' );
    });
  }
});

/**
 * Step Tools Table
 */

db.knex.schema.hasTable('steps_tools' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'steps_tools', function ( step_tool ) {
      step_tool.increments( 'id' ).primary();
      step_tool.integer( 'step_id' );
      step_tool.integer( 'tool_id' );
      step_tool.string( 'qty' );

    }).then( function ( table ) {
      process.verb( 'Created Table: steps_tools' );
    });
  }
});

/**
 * Chat Messages Table
 */

db.knex.schema.hasTable('chatmessages' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'chatmessages', function ( msg ) {
      msg.increments( 'id' ).primary();
      msg.string( 'text' );
      msg.integer( 'user_id' );
      msg.string( 'profilepic_url' );
      msg.integer( 'event_id' );
      msg.timestamps();
    }).then( function ( table ) {
      process.verb( 'Created Table: chatmessages' );
    });
  }
});

/**
 * Notes Table
 */

db.knex.schema.hasTable('notes' ).then( function ( exists ) {
  if ( !exists ) {
    db.knex.schema.createTable( 'notes', function ( note ) {
      note.increments( 'id' ).primary();
      note.string( 'note' );
      note.timestamps();
    }).then( function ( table ) {
      process.verb( 'Created Table: notes' );
    });
  }
});

