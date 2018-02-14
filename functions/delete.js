'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
	const params = {
		TableName: 'recipes',
		Key: {
			recipeId: event.pathParameters.recipeId
		}
	};

	dynamo.delete(params, (error) =>{
		if (error) {
			console.error(error);
			callback(new Error('Cannot delete recipe.'));
			return;
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify({})
		};

		callback(null, response);
	});
};