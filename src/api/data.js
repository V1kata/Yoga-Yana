import { get, put, post, del } from './api.js';
import { addOwner, deleteUserData, setUserData } from './user.js';

const endpoint = {
    'register': 'users',
    'login': 'login',
    'logout': 'users/logout',
    'getAllItems': 'classes/TrainSession',
    'getById': 'classes/TrainSession/',
    'getWhere': 'classes/TrainSession?where='
}

export async function register({ name, username, email, password, trainer }) {
    const { sessionToken, objectId } = await post(endpoint.register, { name, email, username, password, trainer });

    const userData = {
        objectId,
        name,
        email,
        username,
        trainer,
        sessionToken
    }

    setUserData(userData);

    if (!trainer) {
        let obj = JSON.parse(sessionStorage.getItem('registered'));

        if (!obj) {
            obj = {
                objectId: {
                    
                }
            }
        }

        obj.objectId[objectId] = [];

        sessionStorage.setItem('registered', JSON.stringify(obj));
    }
}

export async function login({ email, password }) {
    const { objectId, username, sessionToken, trainer } = await post(endpoint.login, { email, password });

    const userData = {
        objectId,
        email,
        username,
        trainer,
        sessionToken
    }

    setUserData(userData);
    if (!trainer) {
        let obj = JSON.parse(sessionStorage.getItem('registered'));

        if (!obj) {
            obj = {
                objectId: {

                }
            }
        }

        obj.objectId[objectId] = [];

        sessionStorage.setItem('registered', JSON.stringify(obj));
    }
}

export function logout() {
    deleteUserData();
}

export async function getAll() {
    const res = await get(endpoint.getAllItems);

    return res;
}

export async function getById(id) {
    const res = await get(endpoint.getById + id);

    return res;
}

export async function getTrainSessions(date) {
    const fullUrl = endpoint.getWhere + encodeURIComponent(JSON.stringify({ date: date }));
    const res = await get(fullUrl);

    return res;
}

export async function create(trainSession, userId) {
    const data = addOwner(trainSession, userId);

    const res = await post(endpoint.getAllItems, data);

    return res;
}

export async function update(id, trainSession, userId) {
    const data = addOwner(trainSession, userId);

    const res = await put(endpoint.getById + id, data);

    return res;
}

export async function deleteById(id) {
    const res = await del(endpoint.getById + id);

    return res;
}

export async function getUserName(id) {
    const res = await get('/users/' + id)

    return res.username;
}