const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Random_events {
  
  constructor({ event_id, event_name, event_description, impact_amount, impact_type}) {
    this.event_id = event_id;
    this.event_name = event_name;
    this.event_description = event_description;
    this.impact_amount = impact_amount;
    this.impact_type = impact_type;
  }
}

module.exports = Random_events;