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
            <img src="../images/home.png" alt="Home">
            <p id="pLocation">Местоположение: </p>
            <p id="pName">${data.location}</p>
        </div>
    
        <div id="trainType">
            <img src="../images/yoga-posture.png" alt="Yoga">
            <p id="pTypeTraining">Вид тренировка: </p>
            <p id="pTypeName">${data.trainType}</p>
        </div>
    
        <div id="hour">
            <img src="../images/clock.png" alt="Clock">
            <p id="pHour">Час на започаване: </p>
            <p id="pTime">${data.hour}</p>
        </div>
    
        <div id="trainer">
            <img src="../images/trainer.png" alt="Trainer">
            <p id="pTitle">Треньор: </p>
            <p id="pName">${data.name}</p>
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
