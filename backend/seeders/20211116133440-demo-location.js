'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Locations', null, { truncate: true });

		await queryInterface.bulkInsert('Locations', [
			{
				lat: 47.218371,
				lng: -1.553621,
				address: 'Nantes, France',
				position: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				lat: 48.856614,
				lng: 2.3522219,
				address: 'Paris, France',
				position: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				lat: 45.764043,
				lng: 4.835659,
				address: 'Lyon, France',
				position: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Locations', null, { truncate: true });
	},
};
