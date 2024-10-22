import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function BudgetSelectionPage() {
  const [income, setIncome] = useState(30000); // Default income
  const [needs, setNeeds] = useState(0);
  const [savings, setSavings] = useState(0);
  const [wants, setWants] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()

  const incomeLevels = [30000, 75000, 100000, 200000]; // Income options

  // Function to calculate the budget
  const calculateBudget = (selectedIncome) => {
    const needsBudget = selectedIncome * 0.3; // 30% goes to needs
    const remainingBudget = selectedIncome * 0.7; // 70% left for savings and wants

    const savingsBudget = remainingBudget * 0.5; // Divide remaining equally
    const wantsBudget = remainingBudget * 0.5;

    setNeeds(needsBudget);
    setSavings(savingsBudget);
    setWants(wantsBudget);
    setErrorMessage("");
  };

  const handleIncomeChange = (e) => {
    const selectedIncome = parseInt(e.target.value, 10);
    setIncome(selectedIncome);
    calculateBudget(selectedIncome);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (needs + savings + wants !== income) {
      setErrorMessage("Budget does not match income! Please recalculate.");
    } else {
      setErrorMessage("");
      navigate("/game", { state: { income, needs, savings, wants } });
    }
  };

  return (
    <div className="budget-page">
      {/* Game Rules Section */}
      <section className="game-rules">
        <h1>Welcome to the Paytential Game</h1>
        <p>
          In this game, you will be given an income and you'll need to create a budget.
          Remember, only 30% of your income can go towards your "Needs", while the rest should
          be divided between "Savings" and "Wants". The goal is to balance your finances as
          events pop up throughout the game.
        </p>
      </section>

      {/* Budget Form Section */}
      <section className="budget-form">
        <h2>Select Your Income and Budget</h2>
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

          {/* Budget Display */}
          <div className="budget-breakdown">
            <h3>Your Budget Breakdown</h3>
            <p>Needs: ${needs.toLocaleString()}</p>
            <p>Savings: ${savings.toLocaleString()}</p>
            <p>Wants: ${wants.toLocaleString()}</p>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit Budget</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      </section>
    </div>
  );
}
