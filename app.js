const http = require("http");
const URL = require('url');
const querystring = require('querystring');
const StaticHandler = require('./staticHandler');
const DatabaseHandler = require('./databaseHandler');

const port = process.env.PORT || 5000;
var urlObject;

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
    else if(url.match(/^\/api\/getUser/)) {
      const user = await databaseHandler.getUser(urlObject.query.split('=')[1]);
      console.log('User: ' + user);
    }
    else if(url.match(/^\/lobby[^]*/)) {
      let getUsername = () => {
        urlObject = URL.parse(req.url);
      }
      await getUsername();
      staticHandler.serve(req, res, './public/lobby.html');
    }
    else if(url.match(/^\/api\/insertPlayer/)) {
      await databaseHandler.insertPlayer(urlObject.query.split('=')[1]);
    }
    else if(url.match(/^\/api\/insertHand/)) {
      let hand = JSON.parse(req.headers.hands).pieces;
      await databaseHandler.insertHand(urlObject.query.split('=')[1], hand);
    }
    else if(url.match(/^\/api\/getHand/)) {
      await databaseHandler.getHand(urlObject.query.split('=')[1]);
    }
    else if(url.match(/^\/api\/playPiece/)) {
      await databaseHandler.playPiece(id);
    }
    else if(url.match(/^\/api\/getStatus/)) {
      await databaseHandler.getStatus()
    }
    else if(url.match(/^\/game[^]*/)) {
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