import { logout } from "../api/data.js";

export function logoutView(ctx) {
    console.log('logout view');
    logout();
    ctx.page.redirect('/login');
}