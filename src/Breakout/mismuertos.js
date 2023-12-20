import { currentminigame } from "../scenes/GameManager.js";
import Button from "../scenes/button.js";
class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    create() {

        // Pausar el juego principal
        this.scene.pause('Breakout');
        this.libro = this.add.image(400,300,'libro').setDepth(0);
        this.libro.setScale(0.5);
        this.texto = this.add.image(400,300,'Mb').setDepth(0);
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
