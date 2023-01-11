import './style.css'

const menuMobile = document.querySelector('.menu')
const nav = document.querySelector('nav')
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const trhe = document.querySelector('.trhe')
let toggle = false

menuMobile?.addEventListener('click', () => {
  toggle = !toggle

  if(toggle === true){
    nav?.classList.remove('close')
    nav?.classList.add('open')
    one?.classList.add('active-1')
    two?.classList.add('active-2')
    trhe?.classList.add('active-3')
    return
  }else{
    nav?.classList.remove('open')
    nav?.classList.add('close')
    one?.classList.remove('active-1')
    two?.classList.remove('active-2')
    trhe?.classList.remove('active-3')
  }
})


const Now: string = 'https://economia.awesomeapi.com.br/last/USD-BRL'

type USD = {
  bid: String;/* compra */
  ask: String;/* venda */
  varBid: String;/* variação */
  pctChange: String;/* Porcentagem de Variação */
  high: String;/* Máximo */
  low: String/* MInimo */
  name: String;
  create_date: String;
}

type APINow = {
  USDBRL: USD;
}

setInterval( () => {
  fetch(Now)
  .then(data => data.json())
  .then(cotacao => {
  console.log(cotacao)
  
  const data: APINow = cotacao
  renderCotaNow(data)
  })
  }, 30)
  
function renderCotaNow(data: APINow){
  let name = document.querySelector('.name')
  let now = document.querySelector('.now')
  let temp = document.querySelector('.temp')
  
  console.log(data.USDBRL.name)
  
  name.innerHTML = data.USDBRL.name
  now.innerHTML = data.USDBRL.bid
  temp.innerHTML = data.USDBRL.create_date
}

const lastDays: string = 'https://economia.awesomeapi.com.br/json/daily/USD-BRL/30'

function getDolarInLastDays () {
  fetch(lastDays)
  .then(data => data.json())
  .then(datas => {
    renderLastDays(datas)
  })
}
  
const table = document.querySelector('.table')

function renderLastDays(API: any){
  
  type datasArray = {
    datas: any;
    bid: String
  }

  let DayBid: Array<datasArray> = []
  
  API.map(datas => {
    DayBid.push(datas.bid)
  })

  new Chart(table, {
    type: 'bar',
      data: {
        labels: DayBid,
        datasets: [{
          label: 'Dólar',
          data: API.map(dolar => dolar.bid),
          borderWidth: 1,
          backgroundColor: 'green'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
  });
}

getDolarInLastDays()