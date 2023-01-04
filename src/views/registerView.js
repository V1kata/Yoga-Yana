import { register } from "../api/data.js";
import { html } from "../api/lib.js";
import { createSubmitHandler, seePass } from "../api/user.js";
let ctx;

export function registerView(context) {
    console.log('register view');
    ctx = context;

    ctx.render(registerTemp(createSubmitHandler(verification), seePass));
}

async function onSubmit(data) {
    await register(data);
    // ctx.updateNav();
    ctx.page.redirect('/');
}

function verification({ name, surname, email, password, rePass, trainer }) {
    if (!name || !surname || !email || !password || !rePass) {
        alert('Please fill all the fields with the required information');
        return;
    }

    if (username.length < 2 || username.length > 15) {
        alert('Username need to be between 2 and 15 symbols');
        return;
    }

    if (password.length < 3 || password.length > 20) {
        alert('Password needs to be between 3 and 20 symbols');
        return;
    }

    if (rePass.length < 3 || rePass.length > 20) {
        alert('The repeated password needs to be between 3 and 20 symbols');
        return;
    }

    if (password !== rePass) {
        alert('Password needs to be the same with the repeated password');
        return;
    }
    
    if (trainer === 'on') {
        trainer = true;
    } else {
        trainer = false;
    }

    onSubmit({ name, surname, email, password, rePass, trainer });
}


function registerTemp(handler, seePass) {
    return html`
    <h2>
        Register section
    </h2>
    
    <form class="form" id="registerForm" @submit=${handler}>
        <label for="name">Name</label>
        <input type="text" name="name"> <br />
        <label for="surname">Surname</label>
        <input type="text" name="surname"> <br />
        <label for="email">Email</label>
        <input type="email" name="email"> <br />
        <label for="password">Password</label>
        <input type="password" name="password"> <i class="far fa-eye" id="togglePassword" @click=${seePass}></i> <br />
        <label for="rePass">Repeat password</label>
        <input type="password" name="rePass"> <i class="far fa-eye" id="toggleRePassword" @click=${seePass}></i> <br />
        <label for="trainer">Are you a trainer</label>
        <input type="checkbox" name="trainer">
        <p>Already have an account - <a href="/login">login here</a></p>
        <button>Sign up</button>
    </form>`
}