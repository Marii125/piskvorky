import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

const getPlayground = () => {
  let wholePlayground = document.querySelectorAll('.hraci-pole button');
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

  let array = getPlayground(findWinner);

  const winner = findWinner(array);
  //bonus
  if (winner === 'o' || winner === 'x') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      location.reload();
    }, 1000);
  } else if (winner === 'tie') {
    setTimeout(() => {
      alert(`Hra skončila ${winner}.`);
      location.reload();
    }, 1000);
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
