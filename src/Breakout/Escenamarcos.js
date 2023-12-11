import Breakout from './breakout.js';
const config = {
    type: Phaser.AUTO,
    width:800,
    height: 500,
    scene:[Breakout],
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y: 10000},
            debug: false,
        }
    }
    
}
var game = new Phaser.game(config)