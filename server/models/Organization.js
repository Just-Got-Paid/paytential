const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Organization {
  
  constructor({ id,name }) {
    this.id = id;
    this.name = name;
  }
  static async removeStudentFromOrganization(organization_id, user_id) {
    try {
      const user = await knex('users').where({
        id: user_id,
        organization_id: organization_id,
        role: 'student',
      }).first();
  
      if (!user) throw new Error('User not found or not a student in this organization');
      
      await knex('users').where({ id: user_id }).del();
      return user;
    } catch (error) {
      throw new Error('Error removing user from organization: ' + error.message);
    }
  }
  
  static async getStudentsByOrganization(organization_id, role = 'student') {
    try {
      const users = await knex('users').where({ organization_id: organization_id, role });
      return users;
    } catch (error) {
      throw new Error('Error fetching users from organization: ' + error.message);
    }
  }
  
}

module.exports = Organization;