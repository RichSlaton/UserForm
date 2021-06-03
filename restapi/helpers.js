import pickBy from 'lodash/pickBy'

export const response = data => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

export const pickDefined = object => pickBy(object, value => value !== undefined && value !== null)
