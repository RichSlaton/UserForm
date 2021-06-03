import { DynamoDB } from 'aws-sdk'
const dynamo = new DynamoDB.DocumentClient()
export const updateDyanmoSet = async (TableName, Key, updateType, modelSetFieldName, element) => {
  const params = {
    TableName,
    Key,
    UpdateExpression: `${updateType} #v :v`,
    ExpressionAttributeNames: {
      '#v': modelSetFieldName,
    },
    ExpressionAttributeValues: {
      ':v': dynamo.createSet([element]),
    },
    ReturnValues: 'ALL_NEW',
  }
  const updatedSetItem = await dynamo.update(params).promise()
  return updatedSetItem
}

export const updateSetField = async (TableName, Key, fieldName, fieldValue) => {
  if (!['totalMinutes', 'name', 'priority', 'completed'].includes(fieldName)) {
    throw Error(`${fieldName} is unauthorized update field`)
  }
  const params = {
    TableName,
    Key,
    UpdateExpression: `${updateType} #v :v`,
    ExpressionAttributeNames: {
      '#v': modelSetFieldName,
    },
    ExpressionAttributeValues: {
      ':v': dynamo.createSet([element]),
    },
    ReturnValues: 'ALL_NEW',
  }
  const updatedSetItem = await dynamo.update(params).promise()
  return updatedSetItem
}
