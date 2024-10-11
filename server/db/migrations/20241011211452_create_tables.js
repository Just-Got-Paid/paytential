/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Create the organizations table if it doesn't exist
  const organizationsTableExists = await knex.schema.hasTable('organizations');
  if (!organizationsTableExists) {
    await knex.schema.createTable('organizations', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
    });
  }

  // Create the users table if it doesn't exist
  const usersTableExists = await knex.schema.hasTable('users');
  if (!usersTableExists) {
    await knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.enu('role', ['admin', 'student']).notNullable();
      table.decimal('score', 10, 2);
      table.integer('organization_id').unsigned().references('id').inTable('organizations').onDelete('CASCADE');
    });
  }

  // Create the simulations table if it doesn't exist
  const simulationsTableExists = await knex.schema.hasTable('simulations');
  if (!simulationsTableExists) {
    await knex.schema.createTable('simulations', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('current_month').notNullable();
      table.boolean('year_complete').defaultTo(false);
      table.integer('total_networth').notNullable();
    });
  }

  // Create the budgets table if it doesn't exist
  const budgetsTableExists = await knex.schema.hasTable('budgets');
  if (!budgetsTableExists) {
    await knex.schema.createTable('budgets', table => {
      table.increments('id').primary();
      table.integer('simulation_id').unsigned().references('id').inTable('simulations').onDelete('CASCADE');
      table.decimal('savings', 10, 2).notNullable();
      table.decimal('needs', 10, 2).notNullable();
      table.decimal('wants', 10, 2).notNullable();
    });
  }

  // Create the random_events table if it doesn't exist
  const randomEventsTableExists = await knex.schema.hasTable('random_events');
  if (!randomEventsTableExists) {
    await knex.schema.createTable('random_events', table => {
      table.increments('id').primary();
      table.string('event_name').notNullable();
      table.text('event_description');
      table.decimal('impact_amount', 10, 2).notNullable();
      table.enu('impact_type', ['savings', 'needs', 'wants']).notNullable();
    });
  }

  // Create the event_history table if it doesn't exist
  const eventHistoryTableExists = await knex.schema.hasTable('event_history');
  if (!eventHistoryTableExists) {
    await knex.schema.createTable('event_history', table => {
      table.increments('id').primary();
      table.integer('simulation_id').unsigned().references('id').inTable('simulations').onDelete('CASCADE');
      table.integer('event_id').unsigned().references('id').inTable('random_events').onDelete('CASCADE');
      table.integer('month').notNullable();
      table.decimal('impact_amount', 10, 2).notNullable();
    });
  }

  // Create the transactions table if it doesn't exist
  const transactionsTableExists = await knex.schema.hasTable('transactions');
  if (!transactionsTableExists) {
    await knex.schema.createTable('transactions', table => {
      table.increments('id').primary();
      table.integer('simulation_id').unsigned().references('id').inTable('simulations').onDelete('CASCADE');
      table.decimal('amount', 10, 2).notNullable();
      table.enu('category', ['savings', 'needs', 'wants']).notNullable();
      table.text('description').notNullable();
      table.integer('month').notNullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  // Drop tables in reverse order of dependencies
  await knex.schema.dropTableIfExists('transactions');
  await knex.schema.dropTableIfExists('event_history');
  await knex.schema.dropTableIfExists('random_events');
  await knex.schema.dropTableIfExists('budgets');
  await knex.schema.dropTableIfExists('simulations');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('organizations');
};
