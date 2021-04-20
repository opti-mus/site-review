import { items } from './content.js'

function addToCart(items) {
  const wrapper = document.querySelector('.products')

  wrapper.addEventListener('click', (e) => {
    let id = e.target.dataset.content
    items.forEach((el) => {
      if (!localStorage.getItem('cart')) {
        if (el.id == id) {
          localStorage.setItem('cart', JSON.stringify(el))
          fillCart(_drawCart)
        }
      } else {
        let itemLS = localStorage.getItem('cart') + ';' + JSON.stringify(el)

        if (el.id == id) {
          localStorage.setItem('cart', itemLS)
          fillCart(_drawCart)
        }
      }
    })
  })
}

addToCart(items)

function _drawCart(opt) {
  return `
  <div class="cart__item">
    <img src=${opt.imgURL}.webp alt="" class="cart__image">
    <div class="cart__desc">
        <div class="cart__title">${opt.title}</div>
        <p class="cart__price">${opt.price}</p>
    </div>
    <span class="cart__remove">&times</span>
  </div>  
  `
}

function fillCart(drawItem) {
  const cart = document.querySelector('.cart__window')
  const cartCount = document.querySelector('.cart-count')
  let elems = ''
  if (!localStorage.getItem('cart')) {
    cart.innerHTML = 'Ваша корзина пуста!'
    return
  }

  let itemsCart = localStorage.getItem('cart').split(';')
  cartCount.innerHTML = itemsCart.length

  itemsCart.forEach((el) => {
    elems += drawItem(JSON.parse(el))
  })
  cart.innerHTML = elems
}

function showCart() {
  const btnCart = document.querySelector('.cart-btn')
  const cart = document.querySelector('.cart')
  const wrapper = document.querySelector('.cart__wrapper')
  console.log('ok')
  btnCart.addEventListener('click', () => {
    cart.classList.add('open')
    document.body.style.overflowY = 'hidden'
    wrapper.addEventListener('click', (e) => {
      if (e.target.dataset.cart) {
        cart.classList.remove('open')
        document.body.style.overflowY = 'visible'
      }
    })
  })
}
showCart()
fillCart(_drawCart)
