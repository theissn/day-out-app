const axios = require('axios');

exports.handler = async (event, context) => {
    const resp = await axios.get('https://jsonplaceholder.typicode.com/todos');

    return {
        statusCode: 200,
        body: JSON.stringify(resp.data)
      }
}
  