const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

module.exports.handler = async (event) => {
  const params = {
    TableName: process.env.TASKS_TABLE_NAME,
  };

  return dynamodb
    .scan(params)
    .promise()
    .then((data) => {
      const tasks = [];
      for (let i = 0; i < data.Items.length; i++) {
        tasks.push({
          id: data.Items[i].id.S,
          name: data.Items[i].name.S,
          description: data.Items[i].description.S,
        });
      }
      return tasks;
    })
    .catch((err) => {
      console.log(err);
    });
};
