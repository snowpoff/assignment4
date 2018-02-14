'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const params = {
	TableName: 'recipes'
};

module.exports.list = (event, context, callback) => {
	dynamo.scan(params, (error, result) =>{
		if (error) {
			console.error(error);
			callback(new Error('Unable to get recipe list.'));
			return;
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Items)
		};

		callback(null, response);
	});
};
	