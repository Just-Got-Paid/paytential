import React, { useEffect, useState } from 'react';
import { MonthLinkedList } from '../utils/monthLinkedList';

const MonthCalendar = ({ month, year }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
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
  }, [month, year]);

  return (
    <div>
      <h3>Calendar for {month}/{year}</h3>
      <ul>
        {days.map((day, index) => (
          <li key={index}>Day {day}</li>
        ))}
      </ul>
    </div>
  );
};

export default MonthCalendar;
