'use strict';

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
  	region: "us-east-1"
});

const dynamo = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({});

const uploadParams = {
	Bucket: "minidrop", 
	Key: '', 
	Body: ''
};

const file = process.argv[2];
const fileStream = fs.createReadStream(file);

fileStream.on('error', function(err) {
  	console.log('File Error', err);
});

uploadParams.Body = fileStream;
uploadParams.Key = path.basename(file);

s3.upload (uploadParams, function (err, data) {
    if (err) {
    	console.log("Error", err);
    } if (data) {
  		const loc = data.Location;

    	console.log("Upload Success", loc);
    
		const date = new Date();
		const timestamp = date.toString()

		const dbParams = {
			TableName: 'minidboxTable',
			Item: {
//				id: data.ETag.slice(1, -1),
				id: uploadParams.Key,
				location: data.Location,
				timestamp: timestamp,
				delState: 0
			}
		}

		console.log(dbParams)

		dynamo.put(dbParams, function(err, data) {
		    if (err) {
		        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		    } else {
		        console.log("Added item:", JSON.stringify(data, null, 2));
		    }	
		})
    }
});