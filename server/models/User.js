const knex = require("../db/knex");
const authUtils = require("../utils/auth-utils");

class User {
	#passwordHash = null; // a private property

	// This constructor is NOT how a controller creates a new user in the database.
	// Think of it more like a formatter function. It is used by each of the User
	// static methods to hide the hashed password of users before sending user data
	// to the client. Since we want to keep the #passwordHash property private, we
	// provide the isValidPassword instance method as a way to indirectly access it.
	constructor({ id, name, password, email, role, score = 0, organization_id }) {
		this.id = id;
		this.name = name;
		this.#passwordHash = password;
		this.email = email;
		this.role = role;
		this.score = score;
		this.organization_id = organization_id;
	}

	// This instance method takes in a plain-text password and returns true if it matches
	// the User instance's hashed password. Can be used by controllers.
	isValidPassword = async (password) => {
		console.log("Comparing passwords:", password, this.#passwordHash);
		return authUtils.isValidPassword(password, this.#passwordHash); // Compare the plain and hashed passwords
	};

	// Fetches ALL users from the users table, uses the constructor
	// to format each user (and hide their password hash), and returns.
	static async list() {
		const query = `SELECT * FROM users`;
		const result = await knex.raw(query);
		return result.rows.map((rawUserData) => new User(rawUserData));
	}

	// Fetches A single user from the users table that matches
	// the given user id. If it finds a user, uses the constructor
	// to format the user and returns or returns null if not.
	static async find(id) {
		try {
			const result = await knex("users").where({ id }).first(); // Use Knex query builder
			return result ? new User(result) : null; // Return a new User instance if found
		} catch (error) {
			console.error("Error fetching user:", error); // Log the error for debugging
			throw new Error("Database query failed", error);
		}
	}

	// Same as above but uses the name to find the user
	static async findByUsername(name) {
		console.log("Finding user by username:", name);
		const query = `SELECT * FROM users WHERE name = ?`;
		const result = await knex.raw(query, [name]);
		const rawUserData = result.rows[0];
		return rawUserData ? new User(rawUserData) : null;
		// try {
		//   const rawUserData = await knex('users').whereRaw('LOWER(name) = LOWER(?)', [username]).first();
		//   return rawUserData ? new User(rawUserData) : null;
		// } catch (error) {
		//   console.error('Database query error:', error);
		//   throw error; // handle the error as needed
		// }
	}

	// Hashes the given password and then creates a new user
	// in the users table. Returns the newly created user, using
	// the constructor to hide the passwordHash.
	static async create(name, password, email, role, organization_name) {
		console.log(name, password, email, role, organization_name);

		// First, check if the organization exists
		let orgQuery = `SELECT id FROM organizations WHERE name = ?`;
		let orgResult = await knex.raw(orgQuery, [organization_name]);

		if (orgResult.rows.length === 0) {
			try {
				// If the organization doesn't exist, insert it
				const insertOrgQuery = `INSERT INTO organizations (name) VALUES (?) RETURNING id`;
				const newOrgResult = await knex.raw(insertOrgQuery, [
					organization_name,
				]);
				organization_name = newOrgResult.rows[0].id; // Get the newly created organization ID
			} catch (error) {
				// Handle any error with the insertion, like a race condition where the organization
				// was inserted between the select and insert statements
				if (error.code === "23505") {
					// Unique violation error code
					const existingOrg = await knex.raw(orgQuery, [organization_name]);
					organization_name = existingOrg.rows[0].id; // Get the existing organization ID
				} else {
					throw error; // Re-throw other errors
				}
			}
			console.log("afksbdfkajsbfkashbdfkahbdfkjahsbdfjkhasbfkhabs");
		} else {
			// If the organization exists, use its ID
			organization_name = orgResult.rows[0].id;
		}
		// Hash the password
		const passwordHash = await authUtils.hashPassword(password);

		console.log(organization_name, "at line 102");

		// Now insert the user with the fetched or newly created organization_name

		const query = `
      INSERT INTO users (name, password, email, role, organization_id)
      VALUES (?, ?, ?, ?, ?) RETURNING *
    `;

		console.log("helllsdbakdsf");
		console.log("Values:", name, passwordHash, email, role, organization_name);

		const result = await knex.raw(query, [
			name,
			passwordHash,
			email,
			role,
			// score || 0, we dont have score in the tabel
			organization_name,
		]);

		const rawUserData = result.rows[0];
		console.log(rawUserData);

		return new User(rawUserData);
	}

	// Updates the user that matches the given id with a new name.
	// Returns the modified user, using the constructor to hide the passwordHash.
	static async update(id, name) {
		const query = `
      UPDATE users
      SET name=?
      WHERE id=?
      RETURNING *
    `;
		const result = await knex.raw(query, [name, id]);
		const rawUpdatedUser = result.rows[0];
		return rawUpdatedUser ? new User(rawUpdatedUser) : null;
	}

	// Fetches users by organization ID
	static async findByOrganizationId(organization_id) {
		const query = `SELECT * FROM users WHERE organization_id = ?`;
		const result = await knex.raw(query, [organization_id]);
		return result.rows.map((rawUserData) => new User(rawUserData));
	}

	// Deletes a user by ID
	static async deleteById(id) {
		return knex("users").where({ id }).del();
	}

	// Deletes all users
	static async deleteAll() {
		return knex("users").del();
	}
}

module.exports = User;
