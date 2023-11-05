
import A from './scenes/EscenaPrueba.js';
import MainScene from './scenes/MainScene.js';

  const config = {
    width: 800,
    height: 600,
    parent: "container",
    type: Phaser.CANVAS,
    scene: [A, MainScene],
    physics: { 
      default: 'arcade', 
      arcade: { 
          gravity: { y: 0 }, 
          debug: false
      },
      checkCollision: {
        up: true,
        down: true,
        left: true, 
        right: true
      }  
    }
    
    }

  const game = new Phaser.Game(config);
