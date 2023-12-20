import { currentminigame } from "./GameManager.js";
import Button from "./button.js";
export default class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        this.escena = currentminigame;
        console.log("ok");
        this.bg = this.add.image(400,300,'aimbackground').setDepth(0);
        this.resume = new Button(this,400, 300, 0.25,()=>{
        this.scene.stop()
        this.scene.resume(currentminigame)
        
         },'resumeButton');

    }
    update(){
     this.resume.update();
    }
}