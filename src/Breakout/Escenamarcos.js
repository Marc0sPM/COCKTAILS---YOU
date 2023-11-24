import Breakout from './breakout.js';
const config = {
    type: Phaser.AUTO,
    width:800,
    height: 500,
    scene:[Game],
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y: 400},
            debug: false,
        }
    }
}
var game = new Phaser.game(config)