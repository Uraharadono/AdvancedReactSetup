import axios from 'axios';
import { stringify } from 'qs';

function forwardTo(url) {
    window.location = url;
}

function fetchAuthInfo() {
    // implement
    return { something: 'your stuff here.' };
}

function handleError(error) {
    let response = {};

    if (error && error.response.status === 401) {
        // storage.clearObject();
        forwardTo('/unauthorized');
    }

    if (error.response) {
        response = {
            status: error.response.status,
            publicMessage: error.response.statusText,
            ...error.response.data
        };
    }

    return Promise.reject(response);
}

function createRequest(url, data, type, customHeaders = {}) {
    const info = fetchAuthInfo();
    console.log(API_BASE_URL);

    // When you use "API_BASE_URL" it takes value from "webpack.base.babel.js"  from object "createApiBaseUrl.urls" depending on mode (dev or prod)
    // const absoluteUrl = API_BASE_URL + url;

    // I'll just override it here for sake of testing
    const absoluteUrl = `https://reqres.in${url}`;

    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...customHeaders
    };

    // enable this if you have authentication on your ajax requests
    // if (info && info.accessToken) {
    //     headers.Authorization = `Bearer ${info.accessToken}`;
    // }

    return {
        url: absoluteUrl,
        headers,
        method: type,
        data,
        // withCredentials: true // enable this if you have authentication on your ajax requests
        withCredentials: false
    };
}

function get(url, data = {}) {
    const request = Object.assign({}, createRequest(url, null, 'GET'), {
        params: data,
        paramsSerializer: (params) => stringify(params, { allowDots: true, skipNulls: true })
    });
    return axios(request)
        .then((response) => response.data)
        .catch(handleError);
}

function post(url, data = null) {
    return axios(createRequest(url, data, 'POST'))
        .then((response) => response.data)
        .catch(handleError);
}

function put(url, data = null) {
    return axios(createRequest(url, data, 'PUT'))
        .then((response) => response.data)
        .catch(handleError);
}

function del(url, data = null) {
    return axios(createRequest(url, data, 'DELETE'))
        .then((response) => response.data)
        .catch(handleError);
}

export default {
    get,
    post,
    put,
    del
};
