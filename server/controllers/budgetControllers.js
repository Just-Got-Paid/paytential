const Budget = require('../models/Budget')


exports.createBudget = async (req, res) => {
  try {
    const { simulation_id, savings, needs, wants } = req.body;
    const userId = req.session.userId; // Get the user ID from the session

    // Create the budget
    const newBudget = await Budget.create(simulation_id, savings, needs, wants, userId);
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBudgetsBySimulation = async (req, res) => {
  try {
    const { simulation_id } = req.params;
    const budgets = await Budget.findBySimulationId(simulation_id);
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { savings, needs, wants } = req.body;
    const budget = await Budget.findById(id);

    // Only allow the user to update their own budget
    if (budget && budget.user_id === req.session.userId) {
      const updatedBudget = await Budget.update(id, savings, needs, wants);
      res.status(200).json(updatedBudget);
    } else {
      res.status(403).json({ error: 'Forbidden: You do not own this budget' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findById(id);

    // Only allow the user to delete their own budget
    if (budget && budget.user_id === req.session.userId) {
      await Budget.delete(id);
      res.status(204).send();  // No content, successfully deleted
    } else {
      res.status(403).json({ error: 'Forbidden: You do not own this budget' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};