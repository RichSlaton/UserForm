import { model, Schema } from 'dynamoose'
import { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'
const dynamo = new DynamoDB.DocumentClient()

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      hashKey: true,
    },
    items: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  {
    saveUnknown: true,
  }
)

const UserModel = model('user-items-model', UserSchema)

UserModel.methods.set('addItem', async function (userId, itemObject) {
  const itemId = uuid()
  const params = {
    TableName: this.Model.name,
    Key: { userId },
    UpdateExpression: `SET #items.#itemId = :v`,
    ExpressionAttributeNames: {
      '#items': 'items',
      '#itemId': itemId,
    },
    ExpressionAttributeValues: {
      ':v': itemObject,
    },
    ReturnValues: 'UPDATED_NEW',
  }
  const response = await dynamo.update(params).promise()
  const item = response.Attributes.items[itemId]
  return { ...item, id: itemId }
})

UserModel.methods.set('updateItem', async function (userId, item) {
  const params = {
    TableName: this.Model.name,
    Key: { userId },
    UpdateExpression: `SET #items.#itemId = :v`,
    ExpressionAttributeNames: {
      '#items': 'items',
      '#itemId': item.id,
    },
    ExpressionAttributeValues: {
      ':v': item,
    },
    ReturnValues: 'ALL_NEW',
  }
  const response = await dynamo.update(params).promise()
  return response.Attributes.items[item.id]
})

UserModel.methods.set('deleteItem', async function (userId, itemId) {
  const userItems = (await this.get({ userId })).toJSON()
  delete userItems.items[itemId]
  await this.update({ userId }, { $SET: { items: userItems.items } })
  return itemId
})

UserModel.serializer.add('itemsToArray', {
  modify: (serialized, original) => {
    serialized.items = Object.entries(original.items || {})
      .map(([itemId, item]) => ({
        id: itemId,
        ...item,
      }))
      .sort((a, b) => a.priority - b.priority)
    return serialized
  },
})

UserModel.serializer.default.set('itemsToArray')

export default UserModel
