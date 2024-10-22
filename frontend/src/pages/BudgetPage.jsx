import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function BudgetSelectionPage() {
  const [income, setIncome] = useState(30000); // Default income
  const [taxes, setTaxes] = useState(5836)
  const [needs, setNeeds] = useState(0);
  const [savings, setSavings] = useState(0);
  const [wants, setWants] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()

  const incomeLevels = [30000, 75000, 100000, 200000]; // Income options

  // Function to calculate the budget
  const calculateBudget = (selectedIncome) => {
    const netIncome = selectedIncome - taxes // gross income - taxes to get net income
    const needsBudget = netIncome * 0.5; // 50% goes to needs
    const wantsBudget = netIncome * 0.3; // 30% goes to wants
    const savingsBudget = netIncome *0.2; // 20% goes to savings


    setNeeds(needsBudget);
    setSavings(savingsBudget);
    setWants(wantsBudget);
    setErrorMessage("");
  };

  const handleIncomeChange = (e) => {
    const selectedIncome = parseInt(e.target.value, 10);
    setIncome(selectedIncome);
    if (selectedIncome === 30000) setTaxes(5836)
    if (selectedIncome === 70000) setTaxes(18618)
    if (selectedIncome === 10000) setTaxes(30381)
    if (selectedIncome === 20000) setTaxes(69578)
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
            <p>Taxes: ${taxes.toLocaleString()}</p>
            <p>Needs: ${needs.toLocaleString()}</p>
            <p>Wants: ${wants.toLocaleString()}</p>
            <p>Savings: ${savings.toLocaleString()}</p>
            <p>Total: ${taxes + needs + savings + wants}</p>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit Budget</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      </section>
    </div>
  );
}
