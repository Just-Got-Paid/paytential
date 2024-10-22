import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSimulation } from "../adapters/simulation-adapter";

export default function AvatarPage() {
  const { simulationId } = useParams();
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch simulation details when the component mounts
  useEffect(() => {
    const loadSimulation = async () => {
      try {
        const fetchedSimulation = await getSimulation(simulationId);
        setSimulation(fetchedSimulation);
      } catch (err) {
        setError("Error fetching simulation details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSimulation();
  }, [simulationId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!simulation) return <p>No simulation found.</p>;

  return (
    <div className="avatar-page">
      <h1>Simulation Details</h1>
      <p><strong>Current Month:</strong> {simulation.current_month}</p>
      <p><strong>Year Complete:</strong> {simulation.year_complete ? "Yes" : "No"}</p>
      <p><strong>Total Net Worth:</strong> ${simulation.total_networth.toLocaleString()}</p>
      
      {/* You can add more details as needed */}
    </div>
  );
}
