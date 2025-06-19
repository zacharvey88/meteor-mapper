const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const response = await axios.get('https://data.nasa.gov/docs/legacy/meteorite_landings/Meteorite_Landings.json');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch meteorite data' }),
    };
  }
};