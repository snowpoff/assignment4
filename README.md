wmdd4999 assignment 4
melissa chiam

code: https://github.com/snowpoff/assignment4/

tested in postman/with mobile phone

UPDATE TO ASSIGNMENT 3

now has sns functionality - create a .env file with appropriate token/phone number information and should receive an sns when a file is uploaded (same method as in assignment 3, as outline belowed)

```
endpoints:
  GET - https://t7tcx119w1.execute-api.us-east-1.amazonaws.com/test/functions
  PUT - https://t7tcx119w1.execute-api.us-east-1.amazonaws.com/test/functions/{id}
functions:
  list: assignment3-test-list
  delete: assignment3-test-delete
```

upload a file by running upload.js <file path> (i did it in windows cmd, eg >node upload.js images/drawing.png)

this should return something like 
```
Upload Success https://minidrop.s3.amazonaws.com/drawing.png
{ TableName: 'minidboxTable',
  Item:
   { id: 'drawing.png',
     location: 'https://minidrop.s3.amazonaws.com/drawing.png',
     timestamp: 'Wed Mar 21 2018 22:03:40 GMT-0700 (Pacific Daylight Time)',
     delState: 0 } }
```
this uploads a file to an s3 bucket while also writing the entry to a dynamodb table. table content can be checked by sending a GET request to the aforementioned endpoint.

delete an item by sending a PUT request with the object id (reused file name in this case); the object will be deleted from the s3 bucket (you can check this by going to the location url in a browser,  it will return an access denied error because the file doesn't exist anymore)

the associated entry in the dynamodb table will not be deleted, but it will be updated so the `delState = 1` and location url removed.

