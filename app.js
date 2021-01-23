const http = require("http");
const StaticHandler = require('./staticHandler');
const DatabaseHandler = require('./databaseHandler');

const port = process.env.PORT || 5000;

const staticHandler = new StaticHandler();
const databaseHandler = new DatabaseHandler();

http
  .createServer(async (req, res) => {
    // Add Routes
    const url = req.url;
    console.log(url);

    if (url.match(/^\/public/)) {
      staticHandler.serve(req, res);
    }
    else if(url.match(/^\/api\/numPlayers/)) {
      const numPlayers = await databaseHandler.getTotalPlayers();
      console.log("Num Players: ");
      console.log(numPlayers);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(numPlayers));      
    }
    else if(url.match(/^\/lobby/)) {
      staticHandler.serve(req, res, './public/lobby.html');
    }
    else if(url.match(/^\/game/)) {
      staticHandler.serve(req, res, './public/game.html');
    }
    else {
      switch(url) {
        case '/':
        case '/index':
          staticHandler.serve(req, res, './public/index.html');
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