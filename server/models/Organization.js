const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Organization {
  
  constructor({ id, username, organization_id }) {
    this.id = id;
    this.username = username;
    this.organization_id = organization_id;
  }
}

module.exports = Organization;