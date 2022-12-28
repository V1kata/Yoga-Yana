import { render, page } from './api/lib.js';
import { navBar } from './api/nav.js';
import { homepageView } from './views/homepage.js';
import { loginView } from './views/login.js';
import { registerView } from './views/registerView.js';
import { logoutView } from './views/logout.js';
import { activeButton } from './api/buttonActive.js';
import { trainSessionView } from './views/trainingSession.js';
import { allSessionsView } from './views/allSessions.js';
import { hoursView } from './views/hourTraining.js';
import { deleteView } from './views/deleteView.js';
import { editView } from './views/editView.js';
import { loading } from './api/user.js';

const root = document.querySelector('main');

page('/index.html', '/');
page(renderMiddleWare);
page(navBar);
page(activeButton);
page(loading);
page('/', homepageView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/trainSession', trainSessionView);
page('/allSessions', allSessionsView);
page('/hour/:id', hoursView);
page('/delete/:id', deleteView);
page('/edit/:id', editView);
page('*', homepageView);

page.start();

function renderMiddleWare(ctx, next) {
    ctx.render = function (context) {
        render(context, root);
    }

    ctx.updateButton = activeButton;

    next();
}