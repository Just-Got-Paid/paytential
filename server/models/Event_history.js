const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Event_history {
  
  constructor({ id, simulation_id, event_id, time_month, impact_amount}) {
    this.id = id;
    this.simulation_id = simulation_id;
    this.event_id = event_id;
    this.time_month = time_month;
    this.impact_amount = impact_amount;
  }
}

module.exports = Event_history;