import { getById, update } from "../api/data.js";
import { html } from "../api/lib.js";
import { createSubmitHandler, getUserId, reverseDate } from "../api/user.js";
let context;
let id;

export async function editView(ctx) {
    console.log('edit view');
    context = ctx;
    id = ctx.params.id;
    const res = await getById(id);

    ctx.render(editTemp(createSubmitHandler(onSubmit), res));
}

async function onSubmit(data) {
    data.people = Number(data.people);
    data.date = reverseDate(data.date);
    await update(id, data, getUserId());
    context.page.redirect(`/allSessions`);
}

function editTemp(handler, data) {
    return html`
    <h2>
        Edit a training session
    </h2>
    
    <form class="form" id="trainSessionForm" @submit=${handler}>
        <input type="text" placeholder="Trainer's name" name="name" value="${data.name}">
        <input type="text" placeholder="Type of training" name="trainType" value="${data.trainType}">
        <input type="date" placeholder="Date" name="date" value="${reverseDate(data.date)}">
        <input type="time" placeholder="Hour" name="hour" value="${data.hour}">
        <input type="text" placeholder="Location" name="location" value="${data.location}">
        <input type="number" placeholder="Max People" name="people" value="${data.people}">
        <button>Submit</button>
    </form>`
}