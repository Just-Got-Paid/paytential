/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists('event_history')
    .table('random_events', function(table) {
      table.integer('simulation_id').unsigned(); 
      table.foreign('simulation_id').references('simulations.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .createTable('event_history', function(table) {
      table.increments('id').primary();
      table.integer('simulation_id').unsigned().references('simulations.id');
      table.integer('event_id').unsigned().references('random_events.id');
      table.integer('month');
      table.decimal('impact_amount');
    })
    .table('random_events', function(table) {
      table.dropColumn('simulation_id'); //
    });
};
