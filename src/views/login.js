import { login } from "../api/data.js";
import { html } from "../api/lib.js";
import { createSubmitHandler, seePass } from "../api/user.js";
let ctx;

export function loginView(context) {
    console.log('login view');
    ctx = context;
    context.render(loginTemp(createSubmitHandler(verification), seePass));
}

async function onSubmit(data) {
    await login(data);
    ctx.page.redirect('/');
}

function verification({ email, password }) {
    if (password.length < 3 || password.length > 20) {
        alert('Password need to bed between 3 and 20 symbols');
        return
    }

    const data = { email, password };

    onSubmit(data);
}

function loginTemp(handler, seePass) {
    return html`
    <h2>
        Login section
    </h2>
    
    <form class="form" id="loginForm" @submit=${handler}>
        <label for="email">Email</label>
        <input type="email" name="email"> <br />
        <label for="password">Password</label>
        <input type="password" name="password"> <i class="far fa-eye" id="togglePassword" @click=${seePass}></i> <br />
        <p>Don't have an account - <a href="/register">register here</a></p>
        <button>Login</button>
    </form>`;
}