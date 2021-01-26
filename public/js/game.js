class GameLogic {

  constructor() {
    this.totalPieces = new Array();
    this.piecesP1 = undefined;
    this.piecesP2 = undefined;
    this.player1Zone = document.getElementById('piecesPlayer1');
    this.player2Zone = document.getElementById('piecesPlayer2');
    this.api = window.api;
  }

  async init() {

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    await this.getPieces();
    //await this.renderPieces();
  }

  getPieces() {

    console.log('getting pieces');
    this.api.get('getFirstHand', function(response) {
      console.log('data...');
      let data = response;
      console.log(data);
    });

  }

  renderPieces() {

    console.log(this.player1Zone);
    console.log(this.player2Zone);

    for(let i = 0; i < this.piecesP1.length; i++) {
      let img = document.createElement('img');
      img.src = `/public/img/fitxes/${this.piecesP1[i]}`;
      img.style = 'width: 7%; padding: 10px 5px 10px 5px';
      img.draggable = true;
      img.id = `p1-${this.piecesP1[i]}`;
      img.ondragstart = (e) => {
        let imageId = `p1-${this.piecesP1[i]}`;
        console.log('id : ' + imageId);
        drag(e, imageId);
      };
      this.player1Zone.appendChild(img);
    }

    for(let i = 0; i < this.piecesP2.length; i++) {
      let img = document.createElement('img');
      img.src = `/public/img/fitxes/${this.piecesP2[i]}`;
      img.style = 'width: 7%; padding: 10px 5px 10px 5px';
      img.draggable = true;
      img.id = `p2-${this.piecesP2[i]}`;
      img.ondragstart = (e) => {
        let imageId = `p2-${this.piecesP2[i]}`;
        console.log('id : ' + imageId);
        drag(e, imageId);
      };
      img.setAttribute('onclick', 'dragg(this)');
      this.player2Zone.appendChild(img);
    }

  }

}


function drag(e, imageId) {
  console.log(e);

  let gameZoneLeft = document.getElementById('leftContent');
  let gameZoneRight = document.getElementById('rightContent');
  let gameZoneCentral = document.getElementById('playedPieces');
  let image = document.getElementById(imageId);
  var newImg = document.createElement('img');

  // LEFT
  gameZoneLeft.addEventListener('dragenter', e => {
    console.log('Drag enter');
  })
  gameZoneLeft.addEventListener('dragleave', e => {
    console.log('Drag leave');
  })
  gameZoneLeft.addEventListener('dragover', e => {
    e.preventDefault();
    console.log('Drag over');
  })
  gameZoneLeft.addEventListener('drop', e => {
    e.dataTransfer.items.length = 1;
    newImg.src = `/public/img/fitxes/${image.id.substr(3,image.id.length)}`;
    newImg.id = 'new' + image.id;
    newImg.style = 'width: 7%; padding: 10px 5px 10px 5px';
    gameZoneCentral.appendChild(newImg);
    document.getElementById(image.id).remove();
  })

  // RIGHT
  gameZoneRight.addEventListener('dragenter', e => {
    console.log('Drag enter');
  })
  gameZoneRight.addEventListener('dragleave', e => {
    console.log('Drag leave');
  })
  gameZoneRight.addEventListener('dragover', e => {
    e.preventDefault();
    console.log('Drag over');
  })
  gameZoneRight.addEventListener('drop', e => {
    e.dataTransfer.items.length = 1;
    newImg.src = `/public/img/fitxes/${image.id.substr(3,image.id.length)}`;
    newImg.id = 'new' + image.id;
    newImg.style = 'width: 7%; padding: 10px 5px 10px 5px';
    gameZoneCentral.appendChild(newImg);
    document.getElementById(image.id).remove();
  })

}

window.addEventListener('DOMContentLoaded', () => {
  const gameLogic = new GameLogic();
  gameLogic.init();
})
