
class DayNode {
	constructor(day) {
		this.day = day;
		this.next = null;
	}
}

class MonthLinkedList {
	constructor(month, year) {
		this.month = month;
		this.year = year;
		this.head = null;
	}

	// Utility to determine if a year is a leap year
	isLeapYear(year) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}

	// Function to get the number of days in the given month
	getDaysInMonth(month, year) {
		const daysPerMonth = {
			"january": 31,
			"february": this.isLeapYear(year) ? 29 : 28,
			"march": 31,
			"april": 30,
			"may": 31,
			"june": 30,
			"july": 31,
			"august": 31,
			"september": 30,
			"october": 31,
			"november": 30,
			"december": 31,
		};
		return daysPerMonth[month];
	}

	// Create the linked list representing the days of the month
	createMonthList() {
		const numDays = this.getDaysInMonth(this.month, this.year);
		let currentDay = null;

		// Create the head of the list
		this.head = new DayNode(1);
		currentDay = this.head;

		// Create subsequent day nodes and link them
		for (let i = 2; i <= numDays; i++) {
			currentDay.next = new DayNode(i);
			currentDay = currentDay.next;
		}
	}

	// Display the linked list (for simulation purposes)
	displayDays() {
		let current = this.head;
		const days = [];
		while (current !== null) {
			days.push(current.day);
			current = current.next;
		}
		console.log(
			`Days in month ${this.month}, ${this.year}:`,
			days.join(" -> ")
		);
	}
}

// Export the MonthLinkedList class
export default MonthLinkedList;
