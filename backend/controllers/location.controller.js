const { Location } = require('../models');

exports.create = (req, res) => {
	const locationBody = req.body;
	const date = new Date();

	Location.findAll()
		.then((locations) => {
			const exist = locations.some((location) => {
				return Object.keys(location.dataValues).some(function (k) {
					return location[k] === locationBody[k];
				});
			});

			if (exist)
				return res
					.status(403)
					.json({ message: 'Cette location existe déja' });

			Location.create({
				...locationBody,
				createdAt: date,
				updatedAt: date,
			})
				.then((comment) => {
					res.status(201).json({
						lat: comment.dataValues.lat,
						lng: comment.dataValues.lng,
						address: comment.dataValues.address,
					});
				})
				.catch((err) => {
					res.status(501).json({ err });
				});
		})
		.catch((err) => res.status(501).json(err));
};

exports.findAll = (req, res) => {
	Location.findAll({
		attributes: ['lat', 'lng', 'address'],
		order: [['position', 'ASC']],
	})
		.then((locations) => {
			if (locations.length <= 0)
				return res.status(404).json({ message: 'Pas de locations' });

			return res.status(200).json(locations);
		})
		.catch((err) => res.status(501).json(err));
};

exports.findOne = (req, res) => {
	Location.findOne({
		attributes: ['lat', 'lng', 'address'],
		where: { id: req.params.locationId },
	})
		.then((location) => {
			if (!location)
				return res.status(404).json({ message: 'Pas de location' });

			return res.status(200).json(location);
		})
		.catch((error) => res.status(500).json(error));
};

exports.update = (req, res) => {
	console.log('update');
};
exports.delete = (req, res) => {
	console.log('delete');
};
