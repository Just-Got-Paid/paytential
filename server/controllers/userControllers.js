const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");

exports.createUser = async (req, res) => {
	try {
		const { name, password, email, role, score, organization_id } = req.body;

		// Ensure organizationName is provided
		if (!organization_id) {
			return res.status(400).json({ error: "Organization name is required" });
		}

		// Call the create method in User model
		const newUser = await User.create(
			name,
			password,
			email,
			role,
			score,
			organization_id
		);
		return res.status(201).json(newUser);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

exports.listUsers = async (req, res) => {
	const users = await User.list();
	res.send(users);
};

exports.showUser = async (req, res) => {
	const { id } = req.params;

	const user = await User.find(id);
	if (!user) return res.sendStatus(404);
	res.send(user);
};

exports.updateUser = async (req, res) => {
	const { name } = req.body;
	const { id } = req.params;

	// Not only do users need to be logged in to update a user, they
	// need to be authorized to perform this action for this particular
	// user (users should only be able to change their own profiles)
	if (!isAuthorized(id, req.session)) return res.sendStatus(403);

	const updatedUser = await User.update(id, name);
	if (!updatedUser) return res.sendStatus(404);
	res.send(updatedUser);
};

exports.getUsersByOrganization = async (req, res) => {
	const requestingUser = req.session.user_id;

	// Find the user who is making the request
	const user = await User.find(requestingUser);

	//figure out logic here
	if (!user || user.role !== "admin") {
		// If the user is not an admin, deny access
		return res
			.status(403)
			.json({ error: "Only admins can view all users in an organization" });
	}

	// Query to find all users in the same organization
	try {
		const users = await User.findByOrganizationId(user.organization_id);
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ error: "Failed to retrieve users" });
	}
};
