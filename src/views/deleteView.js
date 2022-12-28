import { deleteById } from "../api/data.js";

export async function deleteView(ctx) {
    console.log('delete view');
    const confirmation = confirm('Сигурни ли сте че искате да изтриете тази тренировка');
    
    if (!confirmation) {
        ctx.page.redirect('/allSessions');
        return
    }
    
    const id = ctx.params.id;
    await deleteById(id);

    ctx.page.redirect('/allSessions');
}   