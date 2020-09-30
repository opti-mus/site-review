let list = document.querySelectorAll('.nav-menu li');
let chevron = document.querySelectorAll('.cat__title i');
let select = document.querySelectorAll('.header__slider__select');
let comment = document.querySelectorAll('.header__slider__all-slide');
let pagination = document.querySelectorAll('.pages__list ul li');


function clearClass(a, i, clz) {
    a.forEach(el => {
        if (i.classList.contains(clz)) return false
        else el.classList.remove(clz);
    })
}


document.addEventListener('click', (e) => {
    let allTitle = document.querySelectorAll('.cat__title');

    if (e.target.dataset.list) {
        clearClass(allTitle, e.target, 'anim');
        e.preventDefault();
        e.target.classList.toggle('anim');

        e.target.nextElementSibling.querySelectorAll('li a').forEach(el => {
            el.onclick = (event) => {
                event.preventDefault();
            }
        })
    }
})

const hidePagination = function (pag) {
    pag.forEach((el, inx) => {
        if (inx == pag.length - 2 || inx == pag.length - 3 || inx == pag.length - 4) {
            el.innerHTML = '.'
        }
    })
}

hidePagination(pagination)


tns({
    container: '#myslider',
    items: 1,
    loop: false,
    gutter: 10,
    arrowKeys: false,
    controls: false,
    slideBy: 'page',
    autoplay: false,
    navContainer: '.header__slider__all-selector',
    autoWidth: false,
    preventScrollOnTouch: 'auto',
    // touch:false,
    swipeAngle: false
})