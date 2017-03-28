document.addEventListener('DOMContentLoaded', function () {

  var buttonAdd = document.querySelector('.add')
  var buttonPass = document.querySelector('.pass')
  var buttonBet = document.querySelector('.bet')
  var game = new Game()
  var player1Cards = document.querySelectorAll(".player1 .cards")
  var computerCards = document.querySelectorAll(".computer .cards")
  var betAmount = document.querySelector('input').value

  function Game () {
    this.currentPlayer = 0
    this.isGameOver = false
    this.player = []
  }

function displayCards(player,num,div){
  for (var j=1; j<53; j++){
    if (game.player[player].cards[num].card === j){
      div[num].setAttribute("style","background-image: url('./assets/img/playing-cards-assets/png/"+ j +'.png')}
  }
}

function removeDisplay(player,num,div){
  player1Cards[0].removeAttribute("style")
  player1Cards[1].removeAttribute("style")
  computerCards[0].removeAttribute("style")
  computerCards[1].removeAttribute('style')
}

  Game.prototype.newGame = function () {

    this.player.push(new Player(), new Player())
    this.player[this.currentPlayer].bet()
displayCards(0,1,player1Cards)
displayCards(0,0,player1Cards)
displayCards(1,0,computerCards)
    this.blackJack()
  }




  Game.prototype.switchPlayer = function () {
    if (this.currentPlayer === 0 && this.player[0].pass === 'false') {
      this.currentPlayer = 0
    } else {
      this.currentPlayer = 1
      computerAI()
    }
  }

  Game.prototype.restart = function () {

    setTimeout(function () {
      if (confirm("Play again?")) {
        removeDisplay()
        this.currentPlayer = 0
        this.isGameOver = false
        this.player = []
        this.knownCards = []
        this.newGame()
        computerCards[1].setAttribute('id', 'hide')
        var newCards = document.querySelectorAll('.newCards')
        for (var i = 0; i < newCards.length; i++) {
          newCards[i].parentNode.removeChild(newCards[i])
      }
    }
      else {
     alert('Have a good day!')
      }
    }.bind(this), 1300)
}

  Game.prototype.whoWon = function () {
    if (this.player[0].cardscore > 21) {
      setTimeout(function () { alert('Computer Won!') }, 1300)
      this.player[0].credits = this.player[0].credits - this.player[0].betAmount
    game.restart()
    return this.player[0].credits
    } else if (this.player[1].cardscore > 21) {
      setTimeout(function () { alert('You Won!') }, 1300)
      this.player[0].credits = this.player[0].credits + this.player[0].betAmount
      game.restart()
      return this.player[0].credits
    } else if (this.player[1].cardscore > this.player[0].cardscore) {
      setTimeout(function () { alert('Computer Won!') }, 1300)
      this.player[0].credits = this.player[0].credits - this.player[0].betAmount
      game.restart()
      return this.player[0].credits
    } else if (this.player[0].cardscore > this.player[1].cardscore) {
      setTimeout(function () { alert('You Won!') }, 1300)
      this.player[0].credits = this.player[0].credits + this.player[0].betAmount
      game.restart()
      return this.player[0].credits
    } else {
      setTimeout(function () { alert('It\'s a tie!') }, 1300)
      game.restart()
      return this.player[0].credits
    }
  }

  Game.prototype.blackJack = function () {
    if (this.player[0].cards.length === 2 && this.player[0].cardscore === 21 && this.player[1].cards.length === 2 && this.player[1].cardscore === 21) {
      setTimeout(function () { alert('It\'s a tie!') }, 1300)
      displayCards(1,1,computerCards)
      game.restart()
    } else if (this.player[0].cards.length === 2 && this.player[0].cardscore === 21) {
      setTimeout(function () { alert('You Won!') }, 1300)
      displayCards(1,1,computerCards)
      game.restart()
    } else if (this.player[1].cards.length === 2 && this.player[1].cardscore === 21) {
      setTimeout(function () { alert('Computer Won!') }, 1300)
      displayCards(1,1,computerCards)
      game.restart()
    }

  }

  function Card (card, suit, rank) {
    this.card = card //random number from 1-52
    this.suit = suit // 1-clubs, 2-diamonds,3-hearts,4-spades
    this.rank = rank  // 1-13, ace = 1, j = 11, q = 12, k = 13
  }

  function Player (name) {
    this.name = name
    this.cards = [deal(), deal()]
    this.pass = false
    this.credits = 1000
    this.cardscore = this.score()
  }
  var deal = function () { // general action of dealing
    var card = Math.floor(Math.random() * 52 + 1)
    var rank = card % 13
    var suit = card % 4
    return new Card(card, suit, rank)
  }



  Player.prototype.pass = function () {
    this.pass = true
    return this.pass
  }
  Player.prototype.hit = function () {
    this.cards.push(deal())
    this.score()
  }

  Player.prototype.bet = function (){

  // var betAmount = prompt("What's your bet? You have "+this.credits +' credits currently');
  //   while (betAmount > game.player[game.currentPlayer].credits ){
  //     alert('Bet amount is more than what you currently have, please enter another bet amount.')
  //     var betAmount = prompt("What's your bet?");
  //   }
      // this.betAmount = betAmount
  console.log('play game')

  }

  Player.prototype.score = function () {
    var arrayValue = this.cards.map(function (card) {
      return value(card.rank)
    })
    var score = arrayValue.reduce(function (accu, val) {
      return accu + val
    })
    this.cardscore = score
    return this.cardscore
  }

  function value (rank) {
    if (rank === 11 || rank === 12 || rank === 0) {
      return 10
    } else if (rank === 1) {
      return 11
    } else {
      return rank
    }
  }

  function computerAI () {
    displayCards(1,1,computerCards)
    computerCards[1].removeAttribute('id')
    while (game.currentPlayer !== 0) {
      if (game.player[game.currentPlayer].cardscore < 16) {
        addCard()
      } else {
        game.whoWon()
        game.isGameOver = true
        return game.isGameOver
      }
    }
  }

  var addCard = function () {
    if (game.currentPlayer === 0) {
      var player1Div = document.querySelector('.player1')
      var newCard = document.createElement('div')
      newCard.classList.add('cards', 'newCards')
      player1Div.appendChild(newCard)
      game.player[game.currentPlayer].hit()
      var player1Cards = document.querySelectorAll('.player1 .cards')
      displayCards(0,player1Cards.length-1,player1Cards)
    } else {
      var computerDiv = document.querySelector('.computer')
      var newComputerCard = document.createElement('div')
      newComputerCard.classList.add('cards', 'newCards')
      computerDiv.appendChild(newComputerCard)
      game.player[game.currentPlayer].hit()
      var computerCards = document.querySelectorAll('.computer .cards')
      displayCards(1,computerCards.length-1,computerCards)
    }
  }

  function pass () {
    game.player[game.currentPlayer].pass = true
    game.switchPlayer()
  }


  game.newGame()
  console.log(game)

  buttonAdd.addEventListener('click', addCard)
  buttonPass.addEventListener('click', pass)
  buttonBet.addEventListener('click', game.player[game.currentPlayer].bet())

  console.log(game.player[0].cards)
  console.log(game.player[0].cardscore)
  console.log(game.player[1].cards)
  console.log(game.player[1].cardscore)

  //
  //

  // }
//
})