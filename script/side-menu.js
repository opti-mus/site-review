const wrapper = document.querySelector('.side-menu-wrapper');

document.querySelector('.bars').addEventListener('click', () => {
    wrapper.classList.add('anim');
    document.querySelector('body').style.overflowY = 'hidden';
})

document.addEventListener('click', (e) => {
    if (e.target.dataset.modal) {
        wrapper.classList.remove('anim');
        document.querySelector('body').style.overflowY = 'visible';
    }
})


function fillMenu() {
    const menu = document.querySelector('#side-menu');
    const nav = document.querySelector('.header__top__center_ul').children;
    
    for (let i = 0; i < nav.length; i++) {
        menu.innerHTML += nav[i].outerHTML
    }

}
fillMenu()
