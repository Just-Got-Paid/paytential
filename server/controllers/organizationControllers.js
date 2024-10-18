import Organization from "../models/Organization";

exports.getUsersByOrganization = async (req, res) => {
  const { organization_id } = req.params;
  const { role } = req.query;
  try {
    const users = await Organization.getStudentsByOrganization(organization_id, role);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users from organization' });
  }
}
exports.getUsersByOrganization = async (req, res) => {
  const { organization_id } = req.params;
  const { role } = req.query;
  try {
    const users = await Organization.getStudentsByOrganization(organization_id, role);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users from organization' });
  }
}
