import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let wholePlayground = document.querySelectorAll('.hraci-pole button');

const getPlayground = () => {
  let array = [];
  wholePlayground.forEach((buttonEl, index) => {
    if (buttonEl.classList.contains('board__field--circle')) {
      array.push('o');
    } else if (buttonEl.classList.contains('board__field--cross')) {
      array.push('x');
    } else {
      array.push('_');
    }
  });
  return array;
};
let currentPlayer = 'circle';

//API
const getCrossTurn = async (board) => {
  //bonus
  const checkButton = document.querySelectorAll('.hraci-pole button');
  checkButton.forEach((button) => {
    button.disabled = true;
  });
  //
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: board,
        player: 'x', // Hledá tah pro křížek.
      }),
    },
  );
  const data = await response.json();
  //bonus
  checkButton.forEach((button) => {
    if (
      button.classList.contains('board__field--circle') ||
      button.classList.contains('board__field--cross')
    ) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });

  const { x, y } = data.position;
  const button = wholePlayground[x + y * 10];
  button.click();
};

const play = (event) => {
  event.target.disabled = true;
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    let picture = document.querySelector('.gamer img');
    picture.src = 'img/cross.svg';
    currentPlayer = 'cross';
  } else if (currentPlayer === 'cross') {
    event.target.classList.add('board__field--cross');
    let picture = document.querySelector('.gamer img');
    picture.src = 'img/circle.svg';
    currentPlayer = 'circle';
  }

  let board = getPlayground();
  const winner = findWinner(board);
  //bonus
  if (winner === 'o' || winner === 'x') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      location.reload();
    }, 500);
  } else if (winner === 'tie') {
    setTimeout(() => {
      alert(`Hra skončila ${winner}.`);
      location.reload();
    }, 500);
  }

  //API
  if (currentPlayer === 'cross') {
    getCrossTurn(board);
  }
};

const allButtons = document.querySelectorAll('.hraci-pole button');
allButtons.forEach((selectAllButtons) => {
  selectAllButtons.addEventListener('click', play);
});

// bonus
document.querySelector('.restart').addEventListener('click', (event) => {
  if (confirm('chceš hru opravdu restartovat?') === false) {
    event.preventDefault();
  }
});
