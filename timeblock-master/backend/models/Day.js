import { DynamoDB } from 'aws-sdk'
import { model, Schema } from 'dynamoose'
import { v4 as uuid } from 'uuid'

const dynamo = new DynamoDB.DocumentClient()

const DaySchema = new Schema({
  userId: { type: String, hashKey: true },
  date: {
    type: String,
    rangeKey: true,
  },
  startTime: String,
  items: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          id: String,
          name: String,
          totalMinutes: String,
          priority: { type: String, enum: ['1', '2', '3', '4'] },
          completed: Boolean,
          tags: Array
        },
      },
    ],
  },
})

const DayModel = model('day-items-model', DaySchema)

DayModel.methods.set(
  'updateItem',
  async function (userId, date, dynamoIndex, fieldName, fieldValue) {
    const params = {
      TableName: this.Model.name,
      Key: { userId, date },
      UpdateExpression: `SET #items[${dynamoIndex.toString()}].#fieldName = :v`,
      ExpressionAttributeNames: {
        '#items': 'items',
        '#fieldName': fieldName,
      },
      ExpressionAttributeValues: {
        ':v': fieldValue,
      },
      ReturnValues: 'ALL_NEW',
    }
    const response = await dynamo.update(params).promise()
    const items = response.Attributes.items.map((item, idx) => ({
      ...item,
      dyanmoIndex: idx,
    }))
    return { ...response.Attributes, items }
  }
)

DayModel.serializer.add('setDynamoIndex', {
  modify: (serialized, original) => {
    serialized.items = (original.items || []).map((item, idx) => ({
      dynamoIndex: idx,
      ...item,
    }))
    return serialized
  },
})
DayModel.serializer.default.set('setDynamoIndex')

export default DayModel
