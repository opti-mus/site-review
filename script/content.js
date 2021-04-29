import shuffle from './shuffle.js'

let count = 0
class CreateContent {
  constructor(opt) {
    this.title = opt.title
    this.price = opt.price
    this.imgURL = opt.imgURL
    this.color = opt.color
    this.id = this.idx()()
  }
  idx(){
    return function(){
      return count++
    }
  }
}

export const items = shuffle([
  new CreateContent({
    title: 'Apple TV',
    price: '49.99$',
    imgURL: 'img/AppleTV',
    color: 'black',
  }),
  new CreateContent({
    title: 'Peple Time',
    price: '29.99$',
    imgURL: 'img/Pebble_Time',
    color: 'red',
  }),
  new CreateContent({
    title: 'Withings Smart Body Analyzer ws-50',
    price: '89.99$',
    imgURL: 'img/withings',
    color: 'black',
  }),
  new CreateContent({
    title: 'Ollo Clip New',
    price: '19.99$',
    imgURL: 'img/Ollo_Clip',
    color: 'silver',
  }),
  new CreateContent({
    title: 'Fitbit Charge HR Heart Rate and Activity Tracker',
    price: '49.99$',
    imgURL: 'img/Fitbit_Charge',
    color: 'silver',
  }),
  new CreateContent({
    title: 'Bose SoundLink On-Ear Headphones',
    price: '149.99$',
    imgURL: 'img/Headphones',
    color: 'white',
  }),
  new CreateContent({
    title: 'Apple Watch Sport 38mm',
    price: '39.99$',
    imgURL: 'img/Apple',
    color: 'silver',
  }),
  new CreateContent({
    title: 'Sonos Play-1 Wireless HiFi System',
    price: '89.99$',
    imgURL: 'img/wireless',
    color: 'black',
  }),
])

function _toHTML(opt) {
  return `
    <div class="products__el" >
      <i class="products__el__photo">
          <picture>
              <source srcset=${opt.imgURL}.webp type='image/webp'>
              <img src=${opt.imgURL}.jpg alt="">
          </picture>
      </i>
      <div class="products__el__title">${opt.title}</div>
      <div class="products__el__desc">
        <div class="products__el__check-color">${opt.color}</div>
        <div class="products__el__price">${opt.price}</div>
        <i class="fas fa-shopping-cart products__el__cart" data-content=${opt.id}></i>
      </div>
      
    </div>
  `
}
function addToWeb(drawItem, contents) {
  const wrapper = document.querySelector('.products')
  if (!wrapper) return

  contents.forEach((element) => {
    wrapper.insertAdjacentHTML("afterbegin", drawItem(element))
  })
}
addToWeb(_toHTML,items)

