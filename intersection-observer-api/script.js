const observer = new IntersectionObserver(handler, {
  threshold: 0
})

const container = document.getElementById('container')

function loadNewItems() {
  for (let i = 0; i < 10; i++) {
    let newCard = document.createElement('div')
    newCard.textContent = 'Card Item'
    newCard.classList.add('card')
    container.append(newCard)
  }
}

function handler(entries) {
  const lastCardEntry = entries[0]
  if (lastCardEntry.isIntersecting) {
    loadNewItems()
    observer.unobserve(lastCardEntry.target)
    observer.observe(document.querySelector(".card:last-child"))
  }
}


observer.observe(document.querySelector(".card:last-child"))