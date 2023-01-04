import { getById, update } from "../api/data.js";
import { html, nothing } from "../api/lib.js";
import { getUserData } from "../api/user.js";
let ctx;
let id;
let userId;
let res;


export async function hoursView(context) {
    console.log('hour training view');
    ctx = context;
    id = ctx.params.id;
    res = await getById(id);
    const user = getUserData();
    userId = user?.objectId;
    
    const isOwner = res.owner.objectId == user?.objectId;
    let found;
    const registeredStorage = JSON.parse(sessionStorage.getItem('registered'))?.objectId[userId];

    if (registeredStorage?.length) {
        found = registeredStorage.find(el => el == id);
    }

    const freeSpace = res.people;

    ctx.render(hoursTemp(id, res, user, isOwner, found, freeSpace !== 0));
}

function hoursTemp(id, data, user, isOwner, found, freeSpace) {
    return html`
    <h2>Моля потвърдете вашето записване</h2>
    
    <div id="content">
        <div id="location">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Home">
            <p class="title">Местоположение: </p>
            <p class="data">${data.location}</p>
        </div>
    
        <div id="trainType">
            <img src="https://cdn-icons-png.flaticon.com/512/55/55316.png" alt="Yoga">
            <p class="title">Вид тренировка: </p>
            <p class="data">${data.trainType}</p>
        </div>
    
        <div id="hour">
            <img src="https://cdn-icons-png.flaticon.com/512/109/109613.png" alt="Clock">
            <p class="title">Час на започаване: </p>
            <p class="data">${data.hour}</p>
        </div>
    
        <div id="trainer">
            <img src="https://www.pngkey.com/png/full/833-8337681_personal-trainer-icon.png" alt="Trainer">
            <p class="title">Треньор: </p>
            <p class="data">${data.name}</p>
        </div>

    ${user ?
        isOwner ?
        html`
            <a href="/edit/${id}">
                <button id="edit">Edit</button>
            </a>
            <a href="/delete/${id}">
               <button id="delete">Delete</button>
            </a>` :
                !found ?
                    freeSpace ?
                    html`
                        <button @click=${getTrainData}>Запиши се</button>` :
                    nothing :
                html`<button @click=${deleteTrainData}>Отпиши се</button>` :
        nothing}
    </div>`
}

async function getTrainData() {
    res.people -= 1;
    delete res.createdAt;
    delete res.updatedAt;
    delete res.objectId;

    const obj = JSON.parse(sessionStorage.getItem('registered'));
    obj.objectId[userId].push(id);
    
    sessionStorage.setItem('registered', JSON.stringify(obj));
    debugger
    const result = await update(id, res, res.owner.objectId);

    if (!result) {
        return
    }

    alert('Успешно записване');
    ctx.page.redirect('/allSessions');
}

async function deleteTrainData() {
    const confirmation = confirm('Сигурни ли сте че искате да се отпишете за тази тренировка');

    if (!confirmation) {
        return
    }

    res.people += 1;
    delete res.createdAt;
    delete res.updatedAt;
    delete res.objectId;

    const obj = JSON.parse(sessionStorage.getItem('registered'));
    const position = obj.objectId[userId].indexOf(id);
    obj.objectId[userId].splice(position, 1);
    sessionStorage.setItem('registered', JSON.stringify(obj));

    const result = await update(id, res, res.owner.objectId);

    if (!result) {
        return
    }

    alert('Успешно отписване');
    ctx.page.redirect('/allSessions');
}

// <a href="/trainRegister/${id}"> </a>`
