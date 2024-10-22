import React, { useState, useEffect } from 'react';
import MonthLinkedList  from '../utils/monthLinkedList'; // Assuming the utility is in utils

const Month = () => {
  const [month, setMonth] = useState(1); // Default to January
  const [year, setYear] = useState(2024); // Default to the current year
  const [days, setDays] = useState([]);

  // Function to handle when the month or year changes
  const generateCalendar = () => {
    const linkedList = new MonthLinkedList(month, year);
    linkedList.createMonthList();

    // Traverse the linked list to extract the days
    const allDays = [];
    let current = linkedList.head;
    while (current !== null) {
      allDays.push(current.day);
      current = current.next;
    }
    setDays(allDays);
  };

  useEffect(() => {
    // Generate the calendar for the initial load or when month/year changes
    generateCalendar();
  }, [month, year]);

  return (
    <div>
      <h3>Calendar for {month}/{year}</h3>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="month">Select Month: </label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>

        <label htmlFor="year" style={{ marginLeft: '20px' }}>Select Year: </label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          min={1900}
          max={2100}
          style={{ marginLeft: '10px' }}
        />
      </div>

      <ul>
        {days.map((day, index) => (
          <li key={index}>Day {day}</li>
        ))}
      </ul>
    </div>
  );
};

export default Month
