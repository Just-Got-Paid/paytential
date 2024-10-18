const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Organization {
  
  constructor({ id,name }) {
    this.id = id;
    this.name = name;
  }
  static async removeStudentFromOrganization(organization_id, student_id) {
    try {
      const student = await knex('users')
        .where({ id: student_id, organization_id: organization_id, role: 'student' })
        .first();
      if (!student) throw new Error('Student not found in this organization');
      
      await knex('users').where({ id: student_id }).del();
      return student;
    } catch (error) {
      throw new Error('Error removing student from organization: ' + error.message);
    }
  }
  static async getStudentsByOrganization(organization_id) {
    try {
      const students = await knex('users').where({ organization_id: organization_id, role: 'student' });
      return students;
    } catch (error) {
      throw new Error('Error fetching students from organization: ' + error.message);
    }
  }
}

module.exports = Organization;