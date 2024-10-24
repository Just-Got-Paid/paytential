import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/simulations';

// Create a new simulation
export const createSimulation = async ({ user_id, current_month, year_complete, total_networth }) => {
  return fetchHandler(baseUrl, getPostOptions({ user_id, current_month, year_complete, total_networth }));
};

// Retrieve all simulations for a specific user
export const getAllSimulations = async () => {
  const [simulations, error] = await fetchHandler(`${baseUrl}`);
  if (error) console.log(error); // Print the error for simplicity.
  return simulations || [];
};

// Retrieve a specific simulation by its ID
export const getSimulation = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

// Update a simulation's details //by sim-id
export const updateSimulation = async ({ current_month, year_complete, total_networth }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ current_month, year_complete, total_networth }));
}

// Delete a simulation by its ID
export const deleteSimulation = async (id) => {
  const [response, error] = await fetchHandler(`${baseUrl}/${id}`, deleteOptions);
  if (error) console.log(error);
  return response
  // if (response) {
  //   return true; // Successfully deleted
  // }
};