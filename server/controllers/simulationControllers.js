const Simulation = require('../models/Simulation');

exports.createSimulation = async (req, res) => {
  try {
    const { user_id, current_month, year_complete, total_networth } = req.body;

    // Create a new simulation/avatar
    const newSimulation = await Simulation.create(user_id, current_month, year_complete, total_networth);
    res.status(201).json(newSimulation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Returns all simulations for the logged-in user
exports.getSimulationsByUser = async (req, res) => {
  try {
    const userId = req.session.userId; // Get the user ID from the session
    const simulations = await Simulation.findByUserId(userId);
    res.status(200).json(simulations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Returns simulation info of one avatar run
exports.getSimulationById = async (req, res) => {
  try {
    const { id } = req.params;
    const simulation = await Simulation.findById(id);

    if (simulation) {
      res.status(200).json(simulation);
    } else {
      res.status(404).json({ error: 'Simulation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Updates simulation info of one avatar run
exports.updateSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_month, year_complete, total_networth } = req.body;
    const simulation = await Simulation.findById(id);

    // Only allow the user to update their own simulation
    if (simulation && simulation.user_id === req.session.userId) {
      const updatedSimulation = await Simulation.update(id, current_month, year_complete, total_networth);
      res.status(200).json(updatedSimulation);
    } else {
      res.status(403).json({ error: 'Forbidden: You do not own this simulation' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSimulation = async (req, res) => {
  const  {id}  = req.params;

  const simulation = await Simulation.findById(id);
  try {

    // Only allow the user to delete their own simulation(avatar)
    if (simulation && simulation.user_id === req.session.userId) {
      await Simulation.delete(id);
      res.status(204).send();  // No content, successfully deleted
    } else {
      res.status(403).json({ error: 'Forbidden: You do not own this simulation' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
