const handler = async (event, context, callback) => {
  console.log('debug event', event);
  try {
    const request = event.Records[0].cf.request;
    console.log('debug uri', request.uri);
    if (!request.uri.includes('api') && !request.uri.slice(-7).includes('.')) {
      request.uri = '/index.html';
    }
    console.log('debug after', request.uri);
    callback(null, request);
  } catch (error) {
    console.error('error connecting', error.message);
    throw error;
  }
};

export { handler };
