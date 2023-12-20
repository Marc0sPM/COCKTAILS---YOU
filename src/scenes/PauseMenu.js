import { currentminigame, currenttext } from "./GameManager.js";
import Button from "./button.js";
class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    create() {

        // Pausar el juego principal
        this.scene.pause(currentminigame);
        this.libro = this.add.image(400,300,'libro').setDepth(0);
        this.libro.setScale(0.5);
        this.texto = this.add.image(400,300,currenttext).setDepth(0);
        this.texto.setScale(0.5)

        this.resume = new Button(this,550, 270, 0.25,()=>{
        this.scene.stop()
        this.scene.resume(currentminigame)
        this.sound.resumeAll();
         },'resumeButton');

        this.volextra = new Button(this,490, 340, 0.12,()=>{
             },'resumeButton');
        this.volemenos = new Button(this,610, 340, 0.12,()=>{
            },'resumeButton');
            
        

        
    }
    update(){
        this.resume.update();
       }
}

export default PauseMenu;
