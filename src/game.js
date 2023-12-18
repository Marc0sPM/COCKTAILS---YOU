import Boot from "./scenes/boot.js";
import A from './scenes/EscenaPrueba.js';
import MainScene from './scenes/MainSceneAntiguo.js';
import MainMenu from "./scenes/MainMenu.js";
import EscenaVivuPrueba from "./scenes/EscenaVivuPrueba.js";
import Breakout from "./Breakout/breakout.js";
import barScene from "./scenes/barScene.js";
import Hielos from "./scenes/Hielos.js";
import GameManager from "./scenes/GameManager.js";
import Aim from "./aim/aim.js"
import Refrescos from "./scenes/Refrescos/Refrescos.js";


  const config = {
    width: 800,
    height: 600,
    parent: "container",
    type: Phaser.CANVAS,
    scene: [Boot, MainMenu, barScene, A, MainScene, EscenaVivuPrueba, Breakout,Aim , Refrescos,Hielos],
    scale: {
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,

      // Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
      // con un mínimo y un máximo de tamaño
      mode: Phaser.Scale.FIT,
      min: {
              width: 240,
              height: 120
          },
      max: {
              width: 800,
              height: 600
          },
      zoom: 1
    },
    physics: { 
      default: 'arcade', 
      arcade: { 
          gravity: { y: 0 }, 
          debug: true
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
  var gameManager = new GameManager();
  
