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
};
document.querySelector('button:nth-child(1)').addEventListener('click', play);
document.querySelector('button:nth-child(2)').addEventListener('click', play);
document.querySelector('button:nth-child(3)').addEventListener('click', play);
document.querySelector('button:nth-child(4)').addEventListener('click', play);
document.querySelector('button:nth-child(5)').addEventListener('click', play);
document.querySelector('button:nth-child(6)').addEventListener('click', play);
document.querySelector('button:nth-child(7)').addEventListener('click', play);
document.querySelector('button:nth-child(8)').addEventListener('click', play);
document.querySelector('button:nth-child(9)').addEventListener('click', play);
document.querySelector('button:nth-child(10)').addEventListener('click', play);

// bonus
document.querySelector('.restart').addEventListener('click', (event) => {
  if (confirm('chceš hru opravdu restartovat?') === false) {
    event.preventDefault();
  }
});
