'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  	region: "us-east-1"
});

const dynamo = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({});

module.exports.delete = (event, context, callback) => {
		 
	const delParams = {
	  	Bucket: "minidrop", 
	  	Key: event.pathParameters.id
	};

	s3.deleteObject(delParams, function(err, data) {
	   	if (err) console.log(err);
	   	else {
	   		console.log(data);

			const date = new Date();
			const timestamp = date.toString()

			const dbParams = {
				TableName: 'minidboxTable',
				Item: {
					id: event.pathParameters.id,
					timestamp: timestamp,
					delState: 1
				}
			}

			console.log(dbParams)

			dynamo.put(dbParams, function(err, data) {
			    if (error) {
					console.error(error);
					callback(new Error('Cannot update entry.'));
					return;
				}

				const response = {
					statusCode: 200,
					body: JSON.stringify(result.Item)
				};

				callback(null, response);	
			})
	   	} 	   
	});	
};