const http = require("http");
const URL = require('url');
const querystring = require('querystring');
const StaticHandler = require('./staticHandler');
const DatabaseHandler = require('./databaseHandler');

const port = process.env.PORT || 5000;
const limit = 1;
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
      console.log('1');
    }
    else if(url.match(/^\/api\/numPlayers/)) {
      const numPlayers = await databaseHandler.getTotalPlayers();
      console.log("Num Players: ");
      console.log(numPlayers);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(numPlayers));   
      console.log('2');
   
    }
    else if(url.match(/^\/api\/getUser/)) {
      const user = await databaseHandler.getUser(urlObject.query.split('=')[1]);
      console.log('User: ' + user);
      console.log('3');

    }
    else if(url.match(/^\/lobby[^]*/)) {
      let getUsername = () => {
        urlObject = URL.parse(req.url);
      }
      await getUsername();
      staticHandler.serve(req, res, './public/lobby.html');
      console.log('4');

    } 
    else if(url.match(/^\/api\/insertAllPieces/)) {
      let pieces = JSON.parse(req.headers.data);
      if(limit === 1) {
        await databaseHandler.insertAllPieces(pieces);
        limit++;
      }
      console.log('5');

    }
    else if(url.match(/^\/api\/insertPlayer/)) {
      await databaseHandler.insertPlayer(urlObject.query.split('=')[1]);
      console.log('6');

    }
    else if(url.match(/^\/api\/insertHand/)) {
      let hand = JSON.parse(req.headers.data).hand;
      await databaseHandler.insertHand(hand);
      console.log('7');

    }
    else if(url === '/api/getFirstHand') {
      console.log('getting data...');
      await databaseHandler.getHand1();
      console.log('8');

    }
    else if(url.match(/^\/api\/getSecondHand/)) {
      await databaseHandler.getHand2();
      console.log('9');

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