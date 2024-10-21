// netlify/functions/changeColumnTitle.js

const axios = require('axios');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { boardId, columnId } = JSON.parse(event.body);

    const mutation = `
      mutation {
        change_column_title (board_id: ${boardId}, column_id: "${columnId}", title: "Hello World!") {
          id
          title
        }
      }
    `;

    const response = await axios.post(
      'https://api.monday.com/v2',
      { query: mutation },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.MONDAY_API_KEY,
        },
      }
    );

    const data = response.data;

    if (data.errors) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: data.errors }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.data.change_column_title),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
