import { currentminigame } from "../scenes/GameManager.js";
import Button from "../scenes/button.js";
class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenu' });
    }

    create() {
        // Puedes agregar elementos del menú de pausa aquí, como botones, texto, etc.
        // Por ejemplo:
        this.add.text(400, 300, 'Juego en pausa', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Manejar la resolución del juego

        // Pausar el juego principal
        this.scene.pause('Breakout');

        this.bg = this.add.image(400,300,'aimbackground').setDepth(0);
        this.resume = new Button(this,400, 300, 0.25,()=>{
        this.scene.stop()
        this.scene.resume(currentminigame)
        this.sound.resumeAll();
         },'resumeButton');
        // Volver al juego cuando se hace clic en el menú de pausa
        this.input.on('pointerdown', () => {
            this.scene.stop('PauseMenu');
            this.scene.resume('Breakout');
        });
    }
    update(){
        this.resume.update();
       }
}

export default PauseMenu;
