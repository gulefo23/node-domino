class LoadGame {

    constructor() {
      this.totalPieces = new Array();
      this.pieces = new Array();
      this.player1Zone = document.getElementById('piecesPlayer1');
      this.player2Zone = document.getElementById('piecesPlayer2');
      this.api = window.api;
    }
  
    async init() {
  
      const urlParams = new URLSearchParams(window.location.search);
      const username = urlParams.get('username');
  
      await this.getAllPieces();
      await this.handOutPieces();
    }
  
    getAllPieces() {
  
      let numberOfPieces = 55;
      let pieceFilename = '';
  
      for(let i = 0; i <= numberOfPieces; i++) {
        i.toString().length === 1 ? pieceFilename = `0${i}.png` : pieceFilename = `${i}.png`;
        this.totalPieces.push(pieceFilename);
      }  
    }
  
    handOutPieces() {
      
      for(let i = 0; i < 10; i++) {
        let item = this.totalPieces[Math.floor(Math.random() * this.totalPieces.length)];
        this.pieces.push(item);
      }
  
      this.api.post('insertHand', () => {
        console.log('hand inserted.');
      }, {
        "hand": this.pieces
      })
  
    }
  
}

window.addEventListener('DOMContentLoaded', () => {
  const loadGame = new LoadGame();
  loadGame.init();
})