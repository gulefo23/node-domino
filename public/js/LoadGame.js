const GameHandler = require('../../game/gameHandler');

const gameHandler = new GameHandler();

class LoadGame {

    constructor() {
        this.id = 0;
        this.idInterval;
        this.totalPlayers = gameHandler.getTotalPlayers();
    }

    checkHowManyPlayers() {

        this.idInterval = setInterval(() => {
        //amb aixo creem el JSON amb les dades del servidor
        console.log("LOLOLOLOOOOOOOOOOOOO");
        console.log(this.totalPlayers);
        }, 2000);
       
    }

    cridaAJAXinicial(url) {
        xhr = new XMLHttpRequest();
    
        if (!xhr) {
            alert('problemes amb XHR');
            return false;
        }
        xhr.onreadystatechange = callbackAJAXinicial;
        xhr.open('POST', url, true); // el 3r paràmetre indica que és asíncron
        xhr.send(null);
    }

    callbackAJAXinicial() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //dades = xhr.response;
                dada = JSON.parse(xhr.response);
                mostrarInici(dada);
            } else {
                console.log('problemes amb l\'AJAX');
            }
        }
    
    }

    mostrarInici(dada) {
        var jugadors = this.totalPlayers;
        id = dada.id;
        if(jugadors < 2){
            document.getElementById("missatge").innerText = 'PLEASE WAIT';
        } else if(jugadors == 2){
            document.getElementById("missatge").innerText = 'Opponent found!';
            clearInterval(idInterval);
        } else if(jugadors.length == 2 && id == 0){
            document.getElementById("missatge").innerText = 'Game in progress... Please wait';
            //document.getElementById("btnJugar").attributes.addNamedItem("hidden");
            clearInterval(idInterval);
        }
    }

}

module.exports = LoadGame;