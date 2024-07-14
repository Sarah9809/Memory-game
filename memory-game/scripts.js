document.addEventListener('DOMContentLoaded', () => {
  //opções de cartas
  const cards = [
    {
      name: 'cat',
      img: 'images/cat.png'
    },
    {
      name: 'dog',
      img: 'images/dog.png'
    },
    {
      name: 'rabbit',
      img: 'images/rabbit.png'
    },
    {
      name: 'fish',
      img: 'images/fish.png'
    },
    {
      name: 'bird',
      img: 'images/bird.png'
    },
    {
      name: 'mouse',
      img: 'images/mouse.png'
    },
    {
      name: 'cat',
      img: 'images/cat-text.png'
    },
    {
      name: 'dog',
      img: 'images/dog-text.png'
    },
    {
      name: 'rabbit',
      img: 'images/rabbit-text.png'
    },
    {
      name: 'fish',
      img: 'images/fish-text.png'
    },
    {
      name: 'bird',
      img: 'images/bird-text.png'
    },
    {
      name: 'mouse',
      img: 'images/mouse-text.png'
    }
  ]

  //embaralhar todas as cartas
  cards.sort(() => 0.5 - Math.random())

  //recupaerar elementos
  const board = document.querySelector('.board')
  const resultView = document.querySelector('#result')
  let cardsChosen = [] //cartas escolhidas
  let cardsChosenId = [] //ids das cartas escolhidas para caso de click na mesma imagem
  let cardsWon = [] //cartas combinadas

  //criar o quadro de cartas
  function createBoard() {
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/board.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      card.style.margin = "5px"
      board.appendChild(card)
    }
  }

  //checagem de combinações
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    //verificar clique na mesma imagem 
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/board.png')
      cards[optionTwoId].setAttribute('src', 'images/board.png')
      alert('You clicked on the same image!')
    }
    //verificar combinação se click em imagens diferentes
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match!')
      cards[optionOneId].setAttribute('src', 'images/check.png')
      cards[optionTwoId].setAttribute('src', 'images/check.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/board.png')
      cards[optionTwoId].setAttribute('src', 'images/board.png')
      alert('Failed, try again!')
    }
    cardsChosen = []
    cardsChosenId = []
    //mostrar placar
    resultView.textContent = 'Pairs found: '+cardsWon.length
    if  (cardsWon.length === cards.length/2) {
      resultView.textContent = 'Congratulations! Did you manage to find all the cards!'
    }
  }

  //virar as cartas
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cards[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cards[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})
