document.addEventListener("DOMContentLoaded", () => {
  const api = window.api;

  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');

  api.fetch('GET', 'numPlayers', (response) => {
    const numPlayers = response;

    if(numPlayers >= 2) {

    } else {
      api.fetch('POST', 'insertPlayer', () => {

      }, username);

      const interval = setInterval(() => {
        api.fetch('GET', 'numPlayers', (response) => {
          const numPlayers = response;
      
          if(numPlayers == 2) {
            interval.clear();
            window.location = "/game";
            // comencar joc
          }
        });
      }, 2000);
    }
  });
});