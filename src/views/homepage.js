import { html } from "../api/lib.js";
import { createSubmitHandler } from "../api/user.js";

export function homepageView(ctx) {
    console.log('homepage view');

    ctx.render(homepageTemp(createSubmitHandler(onSubmit)));
}

function onSubmit(data) {
    if (!data.agreement) {
        alert('Please read the privacy policy and agree before submitting');
        return
    }
}

function homepageTemp(handler) {
    return html`
    <h2>
        Чудите се как да се разделите с болката в гърба? <br />
        Как да имате отново изправена стойка? <br />
        Как да се върнете към пълноценния си сън и ползотворния си ден? <br />
    </h2>
    
    <p>
        Попаднали сте на правилното място, защото ние можем да ви помогнем да постигнете това с помощта на нашата
        уникална система от йога, кинезитерапия и медитация.
    </p>
    
    <p>Регистрирай се, за да получиш безплатно видео на тема „Как да се разделим с болките в гърба в три лесни
        стъпки“</p>
    
    <img src="../../images/yogaout.jpg" alt="yogaout" id="yogaout">
    <form id="freeVideos" @submit=${handler}>
        <input type="text" name="username" placeholder="Име" class="input-field" required>
        <input type="email" name="email" placeholder="Имейл" class="input-field" required> <br />
        <input type="checkbox" name="agreement" class="checkbox">
        <label for="agreement" class="checkbox">Съгласен/на съм предоставените от мен данни да бъдат събирани и
            съхранявани - <a href="https://viktor-burboran-privacy.mynotice.io/">Privacy Policy</a></label>
        <button>Изпрати</button>
    </form>`
}