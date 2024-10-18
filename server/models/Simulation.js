const knex = require('../db/knex');


class Simulation {
  
  constructor({ id, user_id, curr_month, year_complete, total_networth}) {
    this.id = id;
    this.user_id = user_id;
    this.curr_month = curr_month;
    this.year_complete = year_complete;
    this.total_networth = total_networth;
  }
}

module.exports = Simulation;