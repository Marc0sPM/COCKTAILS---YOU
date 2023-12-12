import aim from './aim.js';
const config = {
    type: Phaser.AUTO,
    width:800,
    height: 500,
    scene:[aim],
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
}
var game = new Phaser.game(config)