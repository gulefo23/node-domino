document.addEventListener("DOMContentLoaded", () => {
  const api = window.api;
  
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');

  api.get('numPlayers', (response) => {
    const numPlayers = response;
    console.log('NUM PLAYERS: ' + numPlayers);
    if(numPlayers >= 2) {
      document.getElementById('message').innerText = 'Sorry, this game can\'t handle more than 2 players on the same time.';
      console.log('Sorry, this game can\'t handle more than 2 players on the same time.');
    } else {
      api.post('insertPlayer', () => {
        console.log('WELCOME NEW PLAYER...');
      }, username);
      
      document.getElementById('message').innerText = 'Waiting for another player to join...';
      const interval = setInterval(() => {
        api.get('numPlayers', (response) => {
          const numPlayers = response;
      
          if(numPlayers >= 2) {
            document.getElementById('message').innerText = 'Oponent found!';
            clearInterval(interval);
            window.location = `/game?username=${username}`;
            // comencar joc
          }
        }, username);
      }, 2000);
    }
  });
  
});