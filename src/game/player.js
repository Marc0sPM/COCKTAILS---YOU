export default class Player extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, key){
        super(scene, x, y, key)
    }
    preload(){
        this.play('player_idle');
    }
    create(){
        
    }
}