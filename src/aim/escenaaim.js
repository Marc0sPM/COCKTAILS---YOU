import Aim from "/aim.js"

const config = {
    type: Phaser.AUTO,
    width:800,
    height: 600,
    scene:[],
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
}
var game = new Phaser.game(config)