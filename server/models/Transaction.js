const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Transaction {
  
  constructor({ id, simulation_id, amount, category, description, time_month}) {
    this.id = id;
    this.simulation_id = simulation_id;
    this.amount = amount;
    this.category = category;
    this.description = description;
    this.time_month = time_month;
  }
}

module.exports = Transaction;