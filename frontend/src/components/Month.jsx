import React, { useState, useEffect } from 'react';
import MonthLinkedList from '../utils/monthLinkedList';
import '../styles/Month.css';

const Month = () => {
  const [budget, setBudget] = useState(null); // Store the selected budget

  const monthNames = {
    1: "january",
    2: "february",
    3: "march",
    4: "april",
    5: "may",
    6: "june",
    7: "july",
    8: "august",
    9: "september",
    10: "october",
    11: "november",
    12: "december"
  };

  const [currentMonthIndex, setCurrentMonthIndex] = useState(1); // Start from January (1st month)
  const [year, setYear] = useState(2024); // Default to the current year
  const [days, setDays] = useState([]);
  const [monthCount, setMonthCount] = useState(1); // Keep track of the number of months in the simulation

  // Utility to get the day of the week the 1st of the month falls on
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay(); // 0 (Sunday) to 6 (Saturday)
  };

  // Function to handle when the month or year changes
  const generateCalendar = (monthIndex) => {
    const month = monthNames[monthIndex];
    const linkedList = new MonthLinkedList(month, year);
    linkedList.createMonthList();

    const allDays = [];
    let current = linkedList.head;
    while (current !== null) {
      allDays.push(current.day);
      current = current.next;
    }

    // Get the first day of the month (0 = Sunday, 6 = Saturday)
    const firstDayIndex = getFirstDayOfMonth(monthIndex, year);

    // Add empty days for the previous month (if the month doesn't start on Sunday)
    const paddedDays = Array(firstDayIndex).fill(null).concat(allDays);

    setDays(paddedDays);
  };

  useEffect(() => {
    generateCalendar(currentMonthIndex);
  }, [currentMonthIndex, year]);

  const handleNextMonth = () => {
    if (monthCount < 3) {
      const nextMonthIndex = currentMonthIndex === 12 ? 1 : currentMonthIndex + 1;
      setCurrentMonthIndex(nextMonthIndex);
      setMonthCount(monthCount + 1);
    } else {
      alert("The simulation is over!");
    }
  };

  return (
    <div className="calendar-container">
      <h3>Simulation for {monthNames[currentMonthIndex].charAt(0).toUpperCase() + monthNames[currentMonthIndex].slice(1)}/{year}</h3>

      {/* Render the selected budget */}
      {budget && (
        <div className="budget-info">
          <p><strong>Income:</strong> ${budget.income}</p>
          <p><strong>Needs:</strong> ${budget.needs}</p>
          <p><strong>Savings:</strong> ${budget.savings}</p>
          <p><strong>Wants:</strong> ${budget.wants}</p>
        </div>
      )}

      <form>
        <div>
          <label htmlFor="year">Select Year: </label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min={1900}
            max={2100}
          />
        </div>
      </form>

      {/* Render the calendar as a grid */}
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, index) => (
          <div key={index} className="calendar-day">{dayName}</div>
        ))}
        {days.map((day, index) =>
          day ? (
            <div key={index} className="calendar-day">Day {day}</div>
          ) : (
            <div key={index} className="empty-day"></div>
          )
        )}
      </div>

      <button onClick={handleNextMonth} disabled={monthCount >= 3}>
        {monthCount < 3 ? "Next Month" : "End Simulation"}
      </button>

      {monthCount >= 3 && (
        <div className="simulation-ended">Simulation Ended</div>
      )}
    </div>
  );
};

export default Month;

