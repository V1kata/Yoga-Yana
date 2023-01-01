import { html } from "./lib.js";

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function deleteUserData() {
    sessionStorage.removeItem('userData');
}

export function createSubmitHandler(callback) {
    return function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        callback(data, e.target);
    }
}

export function seePass(e) {
    e.preventDefault();
    const tooglePass = e.target;
    let pass;

    if (tooglePass.id === 'togglePassword') {
        pass = document.querySelector('input[name=password]');
    } else {
        pass = document.querySelector('input[name=rePass]');
    }

    let type = pass.type;
    type === 'password' ? type = 'text' : type = 'password'
    pass.type = type;
}

export function createPointer(className, objectId) {
    return { "__type": "Pointer", className, objectId };
}

export function addOwner(record, ownerId) {
    const data = Object.assign({}, record);
    data.owner = createPointer('_User', ownerId);

    return data;
}

export function dates() {
    const date = new Date();
    const todayDate = dateFormat(date);
    let tomorrowDate = new Date();
    tomorrowDate.setDate(date.getDate() + 1);
    tomorrowDate = dateFormat(tomorrowDate);
    return { todayDate: reverseDate(todayDate), tomorrowDate: reverseDate(tomorrowDate) };
}

export function dateFormat(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (day < 10) {
        day = `0${day}`
    }

    if (month < 10) {
        month = `0${month}`
    }
    return date.getFullYear() + '-' + month + '-' + day;
}

export function reverseDate(date) {
    return date.split('-').reverse().join('-');
}

export function loading(ctx, next) {
    ctx.render(html`
    <div id="loading">
        <p>Loading...</p>
    </div>`)

    next();
}

export function getUserId() {
    return getUserData().objectId;
}