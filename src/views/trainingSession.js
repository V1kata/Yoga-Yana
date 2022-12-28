import { create } from "../api/data.js";
import { html } from "../api/lib.js";
import { createSubmitHandler, dateFormat, getUserData, reverseDate } from "../api/user.js";
let ctx;

export function trainSessionView(context) {
    console.log('train session form');
    ctx = context;

    context.render(trainSessionTemp(createSubmitHandler(onSubmit)))
}

async function onSubmit(data) {
    const userId = getUserData().objectId;
    data.date = reverseDate(data.date);
    data.people = Number(data.people);
    await create(data, userId);
    ctx.page.redirect('/');
}

function trainSessionTemp(handler) {
    return html`
    <h2>
        Make a training session
    </h2>
    
    <form class="form" id="trainSessionForm" @submit=${handler}>
        <input type="text" placeholder="Trainer's name" name="name" value="Yana">
        <input type="text" placeholder="Type of training" name="trainType">
        <input type="date" placeholder="Date" name="date" value="${dateFormat(new Date())}">
        <input type="time" placeholder="Hour" name="hour">
        <input type="text" placeholder="Location" name="location">
        <input type="number" placeholder="Max People" name="people">
        <button>Submit</button>
    </form>`
}