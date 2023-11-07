import Boot from "./scenes/boot.js";
import Scene_Pruebasprites from "./scenes/scene_Pruebasprites.js";
import A from './scenes/EscenaPrueba.js';
import MainScene from './scenes/MainSceneAntiguo.js';
import MainMenu from "./scenes/MainMenu.js";



  const config = {
    width: 800,
    height: 600,
    parent: "container",
    type: Phaser.CANVAS,
    scene: [Boot, Scene_Pruebasprites, MainMenu, A, MainScene],
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


  new Phaser.Game(config);
