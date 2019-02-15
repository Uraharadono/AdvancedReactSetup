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
    const absoluteUrl = API_BASE_URL + url;

    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...customHeaders
    };

    if (info && info.accessToken) {
        headers.Authorization = `Bearer ${info.accessToken}`;
    }

    return {
        url: absoluteUrl,
        headers,
        method: type,
        data,
        withCredentials: true
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
