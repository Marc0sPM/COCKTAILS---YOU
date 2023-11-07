import Player from "/game/player.js"

export default class EscenaPrueba extends Phaser.Scene{
    constructor(){
        super({key: 'A' });
    }

    preload(){
        
    }
    create(){
        
        this.player = new Player(this, 300, 300, 'player');
    }
    update(time, delta){

    }
}
