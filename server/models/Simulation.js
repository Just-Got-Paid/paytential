const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Simulation {
  
  constructor({ id, simulation_id, curr_month, year_complete, total_networth}) {
    this.id = id;
    this.simulation_id = simulation_id;
    this.curr_month = curr_month;
    this.year_complete = year_complete;
    this.total_networth = total_networth;
  }
}

module.exports = Simulation;