exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("lane_games", t => {
      t.increments().index();
      t.integer("center_id").notNullable();
      t.timestamp("start_time");
      t.integer("num_of_bowlers");
      // foreign keys
      t.foreign("center_id")
        .references("id")
        .inTable("centers")
        .onDelete("cascade");
    })
    .then(
      knex.schema.createTable("player_games", t => {
        t.increments().index();
        t.integer("lane_game_id");
        t.integer("member_id");
        t.string("score_details", 30);
        t.integer("final_score");
        // foreign keys
        t.foreign("lane_game_id")
          .references("id")
          .inTable("lane_games")
          .onDelete("cascade");
        t.foreign("member_id")
          .references("id")
          .inTable("members")
          .onDelete("cascade");
      })
    );
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("player_games")
    .then(knex.schema.dropTable("lane_games"));
};
