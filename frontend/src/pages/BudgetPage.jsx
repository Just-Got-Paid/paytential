import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSimulation } from "../adapters/simulation-adapter";

const incomeLevels = [45000, 75000, 125000, 200000]; // Income options

// Define lifestyle options focusing only on expenses
const lifestyleOptions = {
  basic: { expenses: { housing: 950, transportation: 200, food: 400, misc: 350 } },
  moderate: { expenses: { housing: 1500, transportation: 300, food: 750, misc: 500} },
  luxury: { expenses: { housing: 2500, transportation: 500, food: 1000,  misc: 1000} },
};

const BudgetSelectionPage = () => {
  const [income, setIncome] = useState("");
  const [taxes, setTaxes] = useState(0);
  const [needs, setNeeds] = useState(0);
  const [savings, setSavings] = useState(0);
  const [wants, setWants] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(""); // Month selection
  const [selectedYear, setSelectedYear] = useState(""); // Year selection
  const [selectedLifestyle, setSelectedLifestyle] = useState(""); // Lifestyle selection
  const [lifestyleExpenses, setLifestyleExpenses] = useState({}); // Store selected lifestyle expenses

  const navigate = useNavigate();

  // Update taxes based on income selection
  useEffect(() => {
    if (income) {
      const taxAmount = getTaxes(income); // Calculate taxes based on income
      setTaxes(taxAmount);
      const netIncome = income - taxAmount; // Calculate net income
      setNeeds(Math.round(netIncome * 0.5 * 100) / 100); // 50% for needs
      setWants(Math.round(netIncome * 0.3 * 100) / 100); // 30% for wants
      setSavings(Math.round(netIncome * 0.2 * 100) / 100); // 20% for savings
    }
  }, [income]);

  const handleIncomeChange = (e) => {
    const selectedIncome = parseInt(e.target.value, 10);
    if (isNaN(selectedIncome)) {
      setIncome(""); // Reset income if "Select Option" is chosen
      setTaxes(0);
      return;
    }
    setIncome(selectedIncome);
  };

  const getTaxes = (income) => {
    switch (income) {
      case 45000: return 10198;
      case 75000: return 20569;
      case 125000: return 40578;
      case 200000: return 69578;
      default: return 0;
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleLifestyleChange = (e) => {
    const selectedLifestyle = e.target.value;
    setSelectedLifestyle(selectedLifestyle);
    setLifestyleExpenses(lifestyleOptions[selectedLifestyle].expenses); // Set expenses based on lifestyle
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalBudget = lifestyleExpenses.housing + lifestyleExpenses.food + lifestyleExpenses.transportation + lifestyleExpenses.misc + taxes;

    // Validate total budget matches income
    if (totalBudget > income) {
      setErrorMessage("Your expenses exceed your income! Please adjust your selections.");
    } else if (!selectedMonth || !selectedYear || !selectedLifestyle) {
      setErrorMessage("Please select a month, year, and lifestyle.");
    } else {
      setErrorMessage("");
      navigate("/month", {
        state: {
          income,
          taxes,
          selectedMonth,
          selectedYear,
          selectedLifestyle,
          lifestyleExpenses // Passing lifestyle expenses
        }
      });
      // Uncomment and replace with actual user ID logic
      // createSimulation({
      //   user_id: /* Your user ID here */,
      //   current_month: selectedMonth,
      //   year_complete: selectedYear,
      //   total_networth: income
      // });
    }
  };

  return (
    <div className="budget-page">
      {/* Game Rules Section */}
      <section className="game-rules">
        <div className="welcome-section">
          <h1>Welcome to the Paytential Game!</h1>
          <p>
            Get ready to embark on a financial adventure where your budgeting skills will be put to the test! In this game, you will be assigned a specific income, and your challenge is to create a well-balanced budget that aligns with your financial goals.
          </p>
          <h3>Here are the key aspects you'll need to keep in mind:</h3>
          <ul>
            <li>
              <strong>Income:</strong> Your journey begins with a predetermined income level. Understanding how to allocate this amount effectively is crucial to your success in the game.
            </li>
            <li>
              <strong>Expenses:</strong> Choose a lifestyle that reflects your desired standard of living. Be mindful that your total expenses must not exceed your income.
            </li>
          </ul>
          <p>
            Throughout the game, unexpected events will challenge your financial planning skills. From sudden expenses to opportunities for investment, you'll need to think critically about how to manage your budget effectively. Your goal is to create a balanced financial plan that allows you to thrive, no matter what surprises come your way.
          </p>
          <p>
            Are you ready to take control of your finances and become a budgeting master? <strong>Let the Paytential Game begin!</strong>
          </p>
        </div>
      </section>

      {/* Budget Form Section */}
      <section className="budget-form">
        <h2>Select Your Income and Budget</h2>
        <form onSubmit={handleSubmit}>
          {/* Month Selection */}
          <div>
            <label htmlFor="month">Select Month: </label>
            <select name="month" value={selectedMonth} onChange={handleMonthChange}>
              <option value="" disabled>Select Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selection */}
          <div>
            <label htmlFor="year">Select Year: </label>
            <select name="year" value={selectedYear} onChange={handleYearChange}>
              <option value="" disabled>Select Year</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={2024 + i}>
                  {2024 + i}
                </option>
              ))}
            </select>
          </div>

          {/* Income Dropdown */}
          <div>
            <label htmlFor="income">Choose Your Income Level: </label>
            <select name="income" value={income} onChange={handleIncomeChange}>
              <option value="" disabled>Select Option</option> {/* Default option */}
              {incomeLevels.map((level) => (
                <option key={level} value={level}>
                  ${level.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Lifestyle Selection */}
          <div>
            <label htmlFor="lifestyle">Select Your Lifestyle: </label>
            <select name="lifestyle" value={selectedLifestyle} onChange={handleLifestyleChange}>
              <option value="" disabled>Select Lifestyle</option>
              <option value="basic">Basic</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          {/* Budget Display */}
          <div className="budget-breakdown">
            <p>Taxes: ${(Math.round(taxes/12 * 100)/100).toLocaleString()}</p>
            <p>Needs: ${(Math.round(needs/12 * 100)/100).toLocaleString()}</p>
            <p>Wants: ${(Math.round(wants/12 * 100)/100).toLocaleString()}</p>
            <p>Savings: ${(Math.round(savings/12 * 100)/100).toLocaleString()}</p>
          </div>

          {/* Expenses Display */}
          <div className="budget-breakdown">
            <h3>Your Expense Breakdown</h3>
            <p>Housing: ${lifestyleExpenses.housing || 0}</p>
            <p>Transportation: ${lifestyleExpenses.transportation || 0}</p>
            <p>Food (Groceries & Eating Out): ${lifestyleExpenses.food || 0}</p>
            <p>Misc: ${lifestyleExpenses.misc || 0}</p>
            <p>Total Expenses: ${(
              (lifestyleExpenses.housing || 0) + 
              (lifestyleExpenses.food || 0) + 
              (lifestyleExpenses.transportation || 0) +
              (lifestyleExpenses.misc || 0)
            ).toLocaleString()}</p>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit">Create Budget</button>
        </form>
      </section>
    </div>
  );
};

export default BudgetSelectionPage;
