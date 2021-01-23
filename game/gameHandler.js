const MongoClient = require('mongodb').MongoClient;
const StaticHandler = require('../staticHandler');
const assert = require('assert');
const url = require('url');

const staticHandler = new StaticHandler();

class GameHandler {

  constructor() {

    this.ruta = 'mongodb://localhost:27017';
    this.dbName = 'domino';
    this.start = false;
    this.totalPlayers = 0;

    this.countPlayers();

    console.log("INITIAL TOTAL PLAYERS VALUE: " + this.totalPlayers);

  }

  getTotalPlayers() { 
    return this.totalPlayers 
  }

  setTotalPlayers(totalPlayers) {
    this.totalPlayers = totalPlayers;
  }

  countPlayers() {

    MongoClient.connect(this.ruta, (err, client) => {
      assert.equal(null, err);
      var db = client.db(this.dbName);
      let countPlayersOnDb = () => {
        return new Promise((resolve, reject) => {
          try {
            db.collection('players').find({}).count((err, count) => {
              this.setTotalPlayers(count);
            })
            resolve();
          } catch(err) {
            reject(err);
          }
        })
      }

      countPlayersOnDb().finally (() => {
        assert.equal(err, null);
      })
      .catch(err => { console.log(err); });

    });

  }

  startGame() {
    return this.totalPlayers < 2 ? false : true;
  }

  startMatchmaking(req, res) {

    let checkDbToCountPlayers = () => {
      return new Promise((resolve, reject) => {
        try {
          this.countPlayers();
          resolve();
        } catch(err) {
          reject(err);
        }
      })
    }

    checkDbToCountPlayers()
    .then(() => {

      var query = url.parse(req.url, true).query;    
      let totalPlayers = this.totalPlayers;

      if(totalPlayers >= 0 && totalPlayers < 2) {
        MongoClient.connect(this.ruta, (err, client) => {
          assert.equal(null, err);
          var db = client.db(this.dbName);
          console.log("Connected...");

          db.collection('players').insertOne({
              "username": query.username
          });

          assert.equal(err, null);
          console.log("Hello new Player!");
          this.totalPlayers++;
          staticHandler.serve(req, res, './public/waitingRoom.html');

        });
      } else {
        console.log("This game can't handle more than two players.");
      }

      this.start = this.startGame();

    })
    .catch(err => console.log(err));

    this.countPlayers();

  }

}

module.exports = GameHandler;