// const User = require("../models/User");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
	// Clear existing data and reset sequences
	await knex("transactions").del();
	// await knex("event_history").del();
	await knex("random_events").del();
	await knex("budgets").del();
	await knex("simulations").del();
	await knex("users").del();
	await knex("organizations").del();

	await knex.raw("ALTER SEQUENCE transactions_id_seq RESTART WITH 1");
	// await knex.raw("ALTER SEQUENCE event_history_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE random_events_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE budgets_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE simulations_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
	await knex.raw("ALTER SEQUENCE organizations_id_seq RESTART WITH 1");

	// Seed organizations
	const organizations = await knex("organizations")
		.insert([
			{ id: 1, name: "Tech Academy" },
			{ id: 2, name: "Finance Institute" },
		])
		.returning("id");

	// Seed users
	//

	const users = await knex("users")
		.insert([
			{
				name: "cool_cat",
				email: "cool_cat@example.com",
				password: "1234", // In a real app, passwords should be hashed
				role: "student",
				score: 75.5,
				organization_id: organizations[0].id,
			},
			{
				name: "l33t-guy",
				email: "l33t_guy@example.com",
				password: "1234",
				role: "admin",
				score: 85.0,
				organization_id: organizations[0].id,
			},
			{
				name: "wowow",
				email: "wowow@example.com",
				password: "1234",
				role: "student",
				score: 90.0,
				organization_id: organizations[1].id,
			},
		])
		.returning("id");
	console.log(users);

	// Seed simulations
	const simulations = await knex("simulations")
		.insert([
			{
				user_id: users[0].id,
				current_month: 3,
				year_complete: false,
				total_networth: 5000,
			},
			{
				user_id: users[1].id,
				current_month: 5,
				year_complete: true,
				total_networth: 15000,
			},
		])
		.returning("id");

	// Seed budgets
	const budgets = await knex("budgets").insert([
		{
			simulation_id: simulations[0].id,
			savings: 1500,
			needs: 2000,
			wants: 1500,
		},
		{
			simulation_id: simulations[1].id,
			savings: 5000,
			needs: 7000,
			wants: 3000,
		},
	]);

	// Seed random_events
	const randomEvents = await knex("random_events")
		.insert([
			{
				event_name: "Car Repair",
				event_description: "Unexpected car repair costs",
				impact_amount: -500,
				impact_type: "needs",
			},
			{
				event_name: "Work Bonus",
				event_description: "Received a bonus for outstanding performance",
				impact_amount: 700,
				impact_type: "savings",
			},
		])
		.returning("id");

	// // Seed event_history
	// const eventHistory = await knex('event_history').insert([
	//   {
	//     simulation_id: simulations[0].id,
	//     event_id: randomEvents[0].id,
	//     month: 2,
	//     impact_amount: -500,
	//   },
	//   {
	//     simulation_id: simulations[1].id,
	//     event_id: randomEvents[1].id,
	//     month: 4,
	//     impact_amount: 700,
	//   },
	// ]);
	// Seed transactions
	const transactions = await knex("transactions").insert([
		{
			simulation_id: simulations[0].id,
			amount: 100,
			category: "needs",
			description: "Groceries",
			month: 1,
		},
		{
			simulation_id: simulations[1].id,
			amount: 200,
			category: "wants",
			description: "New headphones",
			month: 2,
		},
	]);
};
