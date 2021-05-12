import { items } from './content.js'

function addToCart(items) {
  const wrapper = document.querySelector('.products')
  const cart = {}

  wrapper.addEventListener('click', (e) => {
    let id = e.target.dataset.content
    items.forEach((el) => {
      if (!localStorage.getItem('cart')) {
        if (el.id == id) {
          addToLSnew(id, items, cart)
          fillCart(_drawCart)
          updateIcon()
        }
      } else {
        if (el.id == id && !returnItemLS(id)) {
          addToLSnew(id, items, cart)
          fillCart(_drawCart)
          updateIcon()
        }
      }
    })
  })
}
function _drawCart(opt) {
  return `
    <div class="cart__item">
      <img src=${opt.imgURL}.webp alt="" class="cart__image">
      <div class="cart__desc">
          <div class="cart__title">${opt.title}</div>
          <p class="cart__price">${opt.price}</p>
      </div>
      <span class="cart__remove" data-remove=${opt.id}>&times</span>
    </div>  
  
  `
}
function updateIcon() {
  let iconsCart = document.querySelectorAll('[data-content]')
  let icons = [...iconsCart]

  icons.forEach((el) => {
    let idx = el.getAttribute('data-content')

    if (returnItemLS(idx)) {
      if (Object.keys(returnItemLS(idx)).length) {
        el.classList.remove('fa-shopping-cart')
        el.classList.add('fa-cart-plus')
      }
    }
  })
}
function returnItemLS(id) {
  if (!localStorage.getItem('cart')) return {}
  return JSON.parse(localStorage.getItem('cart'))[id]
}
function fillCart(drawItem) {
  const cart = document.querySelector('.cart__window')
  const cartCount = document.querySelector('.cart-count')
  let itemsCart = JSON.parse(localStorage.getItem('cart')) || {}
  let elems = ''

  if (!Object.keys(itemsCart).length) {
    cart.innerHTML = 'Ваша корзина пуста!'
    cartCount.innerHTML = 0
    return
  }

  cartCount.innerHTML = Object.keys(itemsCart).length
  removeItemCart(cart)

  for (let key in itemsCart) {
    elems += drawItem(itemsCart[key])
  }
  elems += `<a href='#' class="cart__buy">Купить</a>`
  cart.innerHTML = elems
}
function removeItemCart(cart) {
  let lsItem = JSON.parse(localStorage.getItem('cart'))

  cart.addEventListener('click', (e) => {
    const id = e.target.dataset.remove
    if (id) {
      delete lsItem[id]
      localStorage.setItem('cart', JSON.stringify(lsItem))
      fillCart(_drawCart)
    }
  })
}
function showCart() {
  const btnCart = document.querySelector('.cart-btn')
  const cart = document.querySelector('.cart')
  const wrapper = document.querySelector('.cart__wrapper')

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
function addToLSnew(id, data, obj) {
  if (!localStorage.getItem('cart')) {
    data.forEach((el) => {
      if (el.id == id) {
        obj[id] = el
        localStorage.setItem('cart', JSON.stringify(obj))
      }
    })
  } else {
    let cart = JSON.parse(localStorage.getItem('cart'))
    data.forEach((el) => {
      if (el.id == id) {
        cart[id] = el
        localStorage.setItem('cart', JSON.stringify(cart))
      }
    })
  }
}

addToCart(items)
showCart()
fillCart(_drawCart)
updateIcon(true)

