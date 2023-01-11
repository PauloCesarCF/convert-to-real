import './sobre.css'

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