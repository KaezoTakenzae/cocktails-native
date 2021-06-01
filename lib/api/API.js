/**
 * class to extend error to hold the response
**/
export class ResponseError extends Error {
  constructor(response, ...params) {
    super(...params);

    this.response = response;
  }
}

/**
 * Check the response headers to ensure everything came back
 * fine, effectively does a check to ensure the status is
 * between 200 and 300
**/
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new ResponseError(response, response.statusText);
  }
}

/**
 * Parse a response to ensure we're sending back JSON
 * and not a stream
 *
 * @param response
 * @returns {*\Promise<any>}
**/
export function parseJSON(response) {
  return response.json();
}

/**
 * API Class, wrapped for request methods, by default:
 * credentials is always set and sent as 'same-origin' for cookies
 * Content-Type is always set to application/json
 *
 * This class SHALL make a pre-flight request to ensure the endpoint
 * supports the requested method
**/
class API {
  constructor() {
    this.useCredentials = true;

    this.headers = {};
    this.controller = null;
  }

  /** Set whether we should send credentials through with
   * a request
   *
   * @param useCredentials
  **/
  setUseCredentials(useCredentials) {
    this.useCredentials = useCredentials;
  }

  /**
   * Generic GET request wrapper, this method assumes you have already
   * URL encoded the request, and are passing that through to the
   * endpoint
   *
   * @param endpoint
   * @returns {Promise<Response | never>}
  **/
  requestGet(endpoint) {
    this.controller = new AbortController();
    let signal = this.controller.signal;

    return fetch(endpoint, {
      credentials: (this.useCredentials ? 'same-origin' : 'anonymous'),
      headers: {...this.headers},
      signal
    })
     .then(checkStatus)
     .then(parseJSON);
  }

  /**
   * Generic POST request wrapper, this method assumes you have sent through an
   * object into the data parameter to be JSON encoded, and that the endpoint in use
   * supports JSON requests
   *
   * @param endpoint
   * @param data
   * @returns {Promise<Response | never>}
  **/
  requestPost(endpoint, data) {
    return fetch(endpoint, {
      method: 'POST',
      credentials: (this.useCredentials ? 'same-origin' : 'anonymous'),
      headers: {
        'Content-Type': 'application/json',
        ...this.headers
      },
      body: JSON.stringify(data)
    })
     .then(checkStatus)
     .then(parseJSON);
  }

  /**
   * Generic PUT request wrapper, this method assumes you have sent through an
   * object into the data parameter to be JSON encoded, and that the endpoint in use
   * supports JSON requests
   *
   * @param endpoint
   * @param data
   * @returns {Promise<Response | never>}
  **/
  requestPut(endpoint, data) {
    return fetch(endpoint, {
      method: 'PUT',
      credentials: (this.useCredentials ? 'same-origin' : 'anonymous'),
      headers: {
        'Content-Type': 'application/json',
        ...this.headers
      },
      body: JSON.stringify(data)
    })
     .then(checkStatus)
     .then(parseJSON);
  }

  /**
   * Generic DELETE request wrapper, this method assumes that the DELETE request
   * requires no parameters, and all is handled via the URL
   *
   * @param endpoint
   * @returns {Promise<Response | never>}
  **/
  requestDelete(endpoint) {
    return fetch(endpoint, {
      method: 'DELETE',
      credentials: (this.useCredentials ? 'same-origin' : 'anonymous'),
      headers: {...this.headers}
    })
     .then(checkStatus)
     .then(parseJSON);
  }

  abortRequest() {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }
}

export default new API();
