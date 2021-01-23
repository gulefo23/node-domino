const http = require("http");
const StaticHandler = require('./staticHandler');
const GameHandler = require('./game/gameHandler');
const LoadGame = require('./public/js/LoadGame');

const port = process.env.PORT || 5000;

const staticHandler = new StaticHandler();
const gameHandler = new GameHandler();
const loadGame = new LoadGame();

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    // Add Routes
    const url = req.url;
    console.log(url);

    if (url.match(/^\/public/)) {
      staticHandler.serve(req, res);
    } else if(url.match(/^\/startMatchmaking/)) {
      gameHandler.startMatchmaking(req, res);
    } else if(url.match(/^\/searchPlayer/)) {
      loadGame.checkHowManyPlayers();
    }
    else {
      switch(url) {
        case '/':
        case '/index':
          staticHandler.serve(req, res, './public/index.html');
          break;
        case '/waitingRoom':
          staticHandler.serve(req, res, './public/waitingRoom.html');
          loadGame.checkHowManyPlayers();
          break;
        case '/gameRoom': 
          staticHandler.serve(req, res, './public/gameRoom.html');
          break;
        default: {
          staticHandler.serve(req, res, './public/404.html');
        }
      }
    }
  })
  .listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });