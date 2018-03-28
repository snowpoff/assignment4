'use strict';

require('dotenv').config()

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const accountSid = process.env.accountSid
const authToken = process.env.authToken

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);


module.exports.sms = (event) => {
  	event.Records.forEach((record) => {
    	const filename = record.s3.object.key;
	    client.messages.create(
	  		{
			    to: process.env.phoneNumTo,
			    from: process.env.phoneNumFr,
			    body: `The new file ${filename} was uploaded to your S3 bucket.`,
			},
  			(err, message) => {
    			console.log(message.sid)
  			}
		).then((message) => console.log('Message sent! SID:' + message.sid));
   	})
}