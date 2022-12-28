export function activeButton(ctx, next) {
    const arrayA = Array.from(document.querySelectorAll('a'));
    arrayA.forEach((el, i) => i !== 0 && el.classList.remove('active'));
    const currentA = arrayA.find((el, i) => i !== 0 && el.pathname == ctx.path);

    if (!currentA) {
        return
    }
    
    currentA.classList.add('active');

    next();
}