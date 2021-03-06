(function() {
  //variable definition
  let newGameBtn = document.getElementById('js-newGameButton'),
    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult'),
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    player = {
      name: '',
      score: 0
    },
    computer = {
      score: 0
    };

  //bind UI events
  newGameBtn.addEventListener('click', newGame);

  pickRock.addEventListener('click', function() {
    playerPick('rock');
  });

  pickPaper.addEventListener('click', function() {
    playerPick('paper');
  });

  pickScissors.addEventListener('click', function() {
    playerPick('scissors');
  });

  //start game
  setGameElements('notStarted');

  function setGameElements(gameState) {
    switch (gameState) {
      case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        break;
      case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
      case 'notStarted':
      default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
    }
  }

  function newGame() {
    player.name = prompt('Please enter your name', 'imie gracza');
    if (player.name) {
      player.score = computer.score = 0;
      setGameElements('started');

      playerNameElem.innerHTML = player.name;
      setGamePoints();
    }
  }

  function getComputerPick() {
    let possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
  }

  function playerPick(playerPick) {
    let computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
  }

  function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    let winnerIs = 'player';

    if (playerPick === computerPick) {
      winnerIs = 'noone'; // remis
    } else if (
      (computerPick === 'rock' && playerPick === 'scissors') ||
      (computerPick === 'scissors' && playerPick === 'paper') ||
      (computerPick === 'paper' && playerPick === 'rock')
    ) {
      winnerIs = 'computer';
    }

    if (winnerIs === 'player') {
      playerResultElem.innerHTML = 'Win!';
      player.score++;
    } else if (winnerIs === 'computer') {
      computerResultElem.innerHTML = 'Win!';
      computer.score++;
    }
    setGamePoints();
    endGame();
  }

  function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
  }

  function endGame() {
    if (computer.score === 10) {
      alert('Wygrał komputer');
      setGameElements('ended');
    }

    if (player.score === 10) {
      alert('Wygrał ' + player.name);
      setGameElements('ended');
    }
  }
})();
