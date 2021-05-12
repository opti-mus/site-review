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
          updateIcon(true)
        }
      } else {
        let itemLS = localStorage.getItem('cart') + ';' + JSON.stringify(el)

        if (el.id == id && !returnItemLS(id).length) {
          localStorage.setItem('cart', itemLS)
          fillCart(_drawCart)
          updateIcon(true)
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
function updateIcon(added) {
  let iconsCart = document.querySelectorAll('[data-content]')
  let icons = [...iconsCart]

  icons.forEach((el) => {
    let idx = el.getAttribute('data-content')

    if (returnItemLS(idx).length) {
      if (added) {
        el.classList.remove('fa-shopping-cart')
        el.classList.add('fa-cart-plus')
      } 
    }
  })
  
}
function returnItemLS(id) {
  if (!localStorage.getItem('cart')) return []
  let lsItem = localStorage.getItem('cart').split(';')
  return lsItem
    .filter((el) => JSON.parse(el).id == id)
    .map((item) => JSON.parse(item))
}
function fillCart(drawItem) {
  const cart = document.querySelector('.cart__window')
  const cartCount = document.querySelector('.cart-count')
  let elems = ''

  if (!localStorage.getItem('cart')) {
    cart.innerHTML = 'Ваша корзина пуста!'
    cartCount.innerHTML = 0
    return
  }
  let itemsCart = localStorage.getItem('cart').split(';')

  cartCount.innerHTML = itemsCart.length
  removeItemCart(cart)

  itemsCart.forEach((el) => {
    elems += drawItem(JSON.parse(el))
  })
  elems += `<a href='#' class="cart__buy">Купить</a>`
  cart.innerHTML = elems
}
function removeItemCart(cart) {
  let lsItem = localStorage.getItem('cart').split(';')
  let arr = []

  cart.addEventListener('click', (e) => {
    const id = e.target.dataset.remove
    if (id) {
      arr = lsItem.filter((el) => JSON.parse(el).id != +id)
      localStorage.setItem('cart', arr.join(';'))
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

addToCart(items)
showCart()
fillCart(_drawCart)
updateIcon(true)
