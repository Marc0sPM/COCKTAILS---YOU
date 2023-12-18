import Aim from "/aim"
const config = {
    type: Phaser.AUTO,
    width:800,
    height: 600,
    scene:[Aim],
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
}
var game = new Phaser.game(config)