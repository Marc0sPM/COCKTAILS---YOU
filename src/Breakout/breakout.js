export default class Breakout extends Phaser.Scene{
    constructor(){
        super({key:'Breakout'});
    }
    create(){
    this.add.image(400, 250, 'background');
    this.gameoverImage = this.add.image(400, 90, 'gameOver');
    this.gameoverImage.visible = false;
    this.paddle = this.physics.add.image(400, 360, 'paddle');
    



   }
}