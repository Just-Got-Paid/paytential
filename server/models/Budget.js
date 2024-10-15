const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Budget {
  constructor({ id, simulation_id, savings, needs, wants }) {
    this.id = id;
    this.simulation_id = simulation_id;
    this.savings = savings;
    this.needs = needs;
    this.wants = wants;
  }
  static async create(simulation_id, savings, needs, wants) {
    const query = `
      INSERT INTO budgets (simulation_id, savings, needs, wants)
      VALUES (?, ?, ?, ?) RETURNING *
    `;
    const result = await knex.raw(query, [simulation_id, savings, needs, wants]);
    const rawBudgetData = result.rows[0];
    return new Budget(rawBudgetData);
  }
  static async findBySimulationId(simulation_id) {
    const query = `
      SELECT * FROM budgets WHERE simulation_id = ?
    `;
    const result = await knex.raw(query, [simulation_id]);
    return result.rows.map((rawBudgetData) => new Budget(rawBudgetData));
  }
  static async update(id, savings, needs, wants) {
    const query = `
      UPDATE budgets
      SET savings = ?, needs = ?, wants = ?
      WHERE id = ?
      RETURNING *
    `;
    const result = await knex.raw(query, [savings, needs, wants, id]);
    const updatedBudget = result.rows[0];
    return new Budget(updatedBudget);
  }
  static async delete(id) {
    return knex('budgets').where({ id }).del();
  }
  
}

module.exports = Budget;