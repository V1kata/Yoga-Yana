import { html, render, nothing } from "../api/lib.js";
import { getUserData } from "./user.js";
const nav = document.querySelector('ul');

export function navBar(ctx, next) {
    const user = getUserData();

    render(navTemp(user), nav);
    next()
}

function navTemp(user) {
    return html`
    <li><a id="catalogLink" href="/">Home</a></li>
    <li><a href="/allSessions">All sessions</a></li>
    ${!user ?
    html`
    <li><a id="loginLink" href="/login">Login</a></li>
    <li><a id="registerLink" href="/register">Register</a></li>` :
    html`
    ${user.trainer ?
                html`
    <li><a href="/trainSession">Create training sessions</a></li>` :
                nothing}
    <li><a id="logoutBtn" href="/logout">Logout</a></li>`}`
}