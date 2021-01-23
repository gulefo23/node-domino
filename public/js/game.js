const MongoClient = require('mongodb').MongoClient;
const StaticHandler = require('../../staticHandler');
const DatabaseHandler = require('../databaseHandler');

const assert = require('assert');
const url = require('url');
class GameHandler {

  constructor() {
    this.staticHandler = new StaticHandler();
    this.databaseHandler = new DatabaseHandler();
    
    this.start = false;
  }

  async loadDatabase() {
    return (new Promise((resolve, reject) => {
      MongoClient.connect(this.ruta, (err, client) => {
        assert.equal(null, err);

        const dbConection = client.db(this.dbName);
        resolve(dbConection);
      });
    }));
  }

  async getTotalPlayers() {
    return (new Promise((resolve, reject) => {
      this.db.collection('players').find({}).count((err, count) => {
        resolve(count);
      })
    }));
  }

  async insertPlayer(username) {
    return (new Promise((resolve, reject) => {
      this.db.collection('players').insertOne({
        "username": username
      });
    }));
  }







    let countPlayersOnDb = () => {
      return new Promise((resolve, reject) => {
        try {
          
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



          assert.equal(err, null);
          console.log("Hello new Player!");
          this.totalPlayers++;
          this.staticHandler.serve(req, res, './public/waitingRoom.html');

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