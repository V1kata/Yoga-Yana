import { getTrainSessions } from "../api/data.js";
import { html } from "../api/lib.js";
import { dates } from '../api/user.js';
let ctx;

export async function allSessionsView(context) {
    console.log('All sessions today');
    ctx = context;
    const { todayDate, tomorrowDate } = dates();
    const todaysHours = await getTrainSessions(todayDate);
    const tommorowHours = await getTrainSessions(tomorrowDate);

    ctx.render(allSessionsTemp(todayDate, tomorrowDate, todaysHours?.results, tommorowHours?.results));
}

function allSessionsTemp(todayDate, tommorowDate, today, tomorrow) {
    debugger
    return html`
    <h2 id="today">
        Това са свободните часове за ${todayDate}
    </h2>
    
    <h2 id="tomorow">
        Това са свободните часове за ${tommorowDate}
    </h2>
    
    <div id="outer">
        <div id="todayDiv">
            ${today.length ?
            today.map(el => allSessionsTodayTemp(el)) :
            html`<b>
                <p>Днес няма тренировки</p>
            </b>`}
        </div>
    
        <div id="tomorowDiv">
            ${tomorrow.length ?
            tomorrow.map(el => allSessionsTomorowTemp(el)) :
            html`<b>
                <p>Утре няма тренировки</p>
            </b>`}
        </div>
    </div>`
}

function allSessionsTodayTemp(el) {
    const id = el.objectId;
    return html`
    <div class="innerData">
        <p>Днес ще тренираме ${el.trainType} с ${el.name}</p>
        <a href="/hour/${id}">${el.hour}</a>
    </div>`
}

function allSessionsTomorowTemp(el) {
    const id = el.objectId;
    return html`
    <div class="innerData">
        <p>Утре ще тренираме ${el.trainType} с ${el.name}</p>
        <a href="/hour/${id}">${el.hour}</a>
    </div>`
}