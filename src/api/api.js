import { getUserData } from "./user.js";

const host = 'https://parseapi.back4app.com/';
const appId = '2Uz59LVjUbUbSbxuWRTY7ltoo2JqrnmBaNeaH0m9';
const apiKey = 'VdSRKbPWHP739L1BGXPDKe8PHe4lG86sDByxPbkX';

export async function request(method, url, data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-Javascript-Key': apiKey
        }
    }

    if (data) {
        options.headers['Content-type'] = 'aplication/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Parse-Session-Token'] = userData.sessionToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status === 204) {
            return response;
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error);
        }

        return data;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const put = request.bind(null, 'put');
export const post = request.bind(null, 'post');
export const del = request.bind(null, 'delete');