const MongoClient = require('mongodb').MongoClient;
const StaticHandler = require('./staticHandler');
const assert = require('assert');
const url = require('url');
const { resolve } = require('path');

class DatabaseHandler {

  constructor() {
    this.ruta = 'mongodb://localhost:27017';
    this.dbName = 'domino';
    this.db = undefined;

    this.loadDatabase();
  }

  loadDatabase() {
    MongoClient.connect(this.ruta, (err, client) => {
      assert.equal(null, err);

      this.db = client.db(this.dbName);
      console.log('Connected to database ' + this.dbName);
    });
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
      resolve();
    }));
  }

  async insertHand(username, hand) {
    return (new Promise((resolve, reject) => {
      this.db.collection('hands').insertOne({
        "username": username,
        "hand": hand
      })
      resolve();
    }))
  }

  async getHand(username) {
    return (new Promise((resolve, reject) => {
      try {
        this.db.collection('hands').find({
          "username": username
        })
        resolve();
      } catch(err) {
        reject(err);
      }
    }))    
  }

  async playPiece(id) {
    return (new Promise((resolve, reject) => {
      this.db.collection('status').insertOne({
        "id": id
      })
      resolve();
    }))
  }

  async getStatus() {
    return (new Promise((resolve, reject) => {
      this.db.collection('status').find();
      resolve();
    }))
  }
}
  
module.exports = DatabaseHandler;