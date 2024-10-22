const knex = require('../db/knex');


class Simulation {
  
  constructor({ id, user_id, curr_month, year_complete, total_networth}) {
    this.id = id;
    this.user_id = user_id;
    this.curr_month = curr_month;
    this.year_complete = year_complete;
    this.total_networth = total_networth;
  }

  // New simulation recorded
  static async create(user_id, current_month, year_complete, total_networth) {
    const query = `
      INSERT INTO simulations (user_id, current_month, year_complete, total_networth)
      VALUES (?, ?, ?, ?) RETURNING *
    `;
    const result = await knex.raw(query, [user_id, current_month, year_complete, total_networth]);
    const rawSimulationData = result.rows[0];
    return new Simulation(rawSimulationData);
  }

  // Retrieves all simulations associated with a specific user ID
  static async findByUserId(user_id) {
    const query = `
      SELECT * FROM simulations WHERE user_id = ?
    `;
    const result = await knex.raw(query, [user_id]);
    return result.rows.map((rawSimulationData) => new Simulation(rawSimulationData));
  }

  // Id here represents simulation_id
  // Retrieves a simulation by its ID
  static async findById(id) {
    const query = `
      SELECT * FROM simulations WHERE id = ?
    `;
    const result = await knex.raw(query, [id]);
    return result.rows.length ? new Simulation(result.rows[0]) : null;
  }

  // Updates a simulation’s details based on its id(simulation_id)
  static async update(id, current_month, year_complete, total_networth) {
    const query = `
      UPDATE simulations
      SET current_month = ?, year_complete = ?, total_networth = ?
      WHERE id = ?
      RETURNING *
    `;
    const result = await knex.raw(query, [current_month, year_complete, total_networth, id]);
    const updatedSimulation = result.rows[0];
    return new Simulation(updatedSimulation);
  }

  static async delete(id) {
    return knex('simulations').where({ id }).del();
  }
}

module.exports = Simulation;