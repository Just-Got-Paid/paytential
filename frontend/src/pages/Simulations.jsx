import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createSimulation, getAllSimulations, deleteSimulation } from "../adapters/simulation-adapter"; 
// import { useCurrentUser } from "../contexts/current-user-context"; // Import the hook
import CurrentUserContext from "../contexts/current-user-context";

export default function SimulationPage() {
  const { currentUser } = useContext(CurrentUserContext); // Get the current user from context
  const [income, setIncome] = useState(30000); // Default income
  const [simulations, setSimulations] = useState([]);
  const navigate = useNavigate();
  const incomeLevels = [30000, 75000, 100000, 200000]; // Income options

  // Fetch existing simulations on component mount
  useEffect(() => {
    const loadSimulations = async () => {
      if (!currentUser) {
        console.log("User not logged in."); 
        return; // Exit if no user is logged in
      }
      console.log(currentUser.id); 
      const userSimulations = await getAllSimulations(); 
      setSimulations(userSimulations);
    };
  
    loadSimulations();
  }, [currentUser]);

  const handleIncomeChange = (e) => {
    setIncome(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("No user logged in.");
      return;
    }

    try {
      const currentMonth = new Date().getMonth() + 1; // Get current month as a number (1-12)
      const yearComplete = false;

      await createSimulation({
        user_id: currentUser.id, 
        current_month: currentMonth,
        year_complete: yearComplete,
        total_networth: 0,
      });

      // Re-fetch simulations after creating a new one
      const userSimulations = await getAllSimulations();
      setSimulations(userSimulations);
    } catch (error) {
      console.error("Error creating simulation:", error);
    }
  };

  const handleDelete = async (simulationId) => {
    console.log("Attempting to delete simulation with ID:", simulationId);
    try {
      const response = await deleteSimulation(simulationId);
      if (!response) {
        console.error("Failed to delete simulation: No response");
      } else {
        setSimulations(simulations.filter(sim => sim.id !== simulationId));
        console.log("Simulation deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting simulation:", error);
    }
  };  


  return (
    <div className="simulation-page">
      {/* Game Rules Section */}
      <section className="game-rules">
        <h1>Welcome to the Paytential Game</h1>
        <p>
          In this game, you will create simulations based on your income.
          Choose your income level to create a simulation and manage your finances as events pop up throughout the game.
        </p>
      </section>

      {/* Simulation Form Section */}
      <section className="simulation-form">
        <h2>Select Your Income Level</h2>
        <form onSubmit={handleSubmit}>
          {/* Income Dropdown */}
          <div>
            <label htmlFor="income">Choose Your Income Level: </label>
            <select name="income" value={income} onChange={handleIncomeChange}>
              {incomeLevels.map((level) => (
                <option key={level} value={level}>
                  ${level.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <button type="submit">Create Simulation</button>
        </form>
      </section>

      {/* Simulations List Section */}
      <section className="simulations-list">
        <h2>Your Simulations</h2>
        <ul>
          {simulations.map((simulation) => (
            <li key={simulation.id}>
              {simulation.year_complete ? (
                <>Simulation for Month: {simulation.current_month}, Year Complete: Yes, Total Net Worth: ${simulation.total_networth.toLocaleString()}</>
              ) : (
                <Link 
                  to={`/avatar/${simulation.id}`} 
                  style={{ textDecoration: 'none', color: 'blue' }} 
                >
                  Simulation for Month: {simulation.current_month}, Year Complete: No, Total Net Worth: ${simulation.total_networth.toLocaleString()}
                </Link>
              )}
              <button onClick={() => handleDelete(simulation.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}



