const { isAuthorized } = require("../utils/auth-utils");
const User = require("../models/User");

exports.deleteStudent = async (req, res) => {
	// deleting student as admin
	const { id } = req.body;

	// check if role is admin
	try {
		const result = await User.find(id);
		if (!result) {
			return res.status(404).json({ error: "User not found" });
		}
		User.deleteById(id);
		return res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		return res
			.status(500)
			.json({ error: "Failed to delete user", details: error.message });
	}
};
