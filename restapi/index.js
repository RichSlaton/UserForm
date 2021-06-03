
import { response } from "./helpers";


export const testGet = async ({ queryStringParameters }) => {
  //const { userId } = queryStringParameters;

  return response({ testInfo:'hello' });
};


export const submit = async({body})=>{
  const formData = JSON.parse(body)
  console.log('Form Data Received',{formData})
  return response({sucess:true,formData})
}