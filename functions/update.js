'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
	const data = JSON.parse(event.body);
	const params = {
		TableName: 'recipes',
		Item: {
			recipeId: event.pathParameters.recipeId,
			recipeName: data.name,
			recipeIngr: data.ingr,
			recipeDesc: data.desc
		}
	};

	dynamo.put(params, (error, result) =>{
		if (error) {
			console.error(error);
			callback(new Error('Cannot update recipe.'));
			return;
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		};

		callback(null, response);
	});
};
