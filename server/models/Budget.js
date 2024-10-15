const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Budget {
  
  constructor({ id, curr_month, year_complete, total_networth}) {
    this.id = id;
    this.curr_month = curr_month;
    this.year_complete = year_complete;
    this.total_networth = total_networth;
  }
}

module.exports = Budget;