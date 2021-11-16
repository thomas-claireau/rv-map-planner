'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Locations', [
			{
				lat: 47.218371,
				lng: -1.553621,
				address: 'Nantes, France',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				lat: 48.856614,
				lng: 2.3522219,
				address: 'Paris, France',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				lat: 45.764043,
				lng: 4.835659,
				address: 'Lyon, France',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Location', null, {});
	},
};
