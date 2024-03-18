export const response = (data) => {
  const { env } = process.env;
  const { headers, ...rest } = data || {};
  const responseBody = {
    success: 'true',
    ...rest,
  };

  let defaultHeaders;

  if (env === 'dev') {
    defaultHeaders = {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    };
  }

  const respObj = {
    statusCode: 200,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: JSON.stringify(responseBody),
  };

  return respObj;
};
