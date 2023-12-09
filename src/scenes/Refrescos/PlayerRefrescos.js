import Player from "../player.js";

export default class PlayerRefrescos extends Player {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.cursor = scene.input.keyboard.addKeys({
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        this.velocity = 15000
    }

    // Nuevos métodos para PlayerRefrescos
    Jump() {
        this.setVelocityY(-this.velocity)
    }
    
    update() {
        super.update();
        

        if (this.cursor.jump.isDown && this.body.touching.down) {
            this.Jump();
        }
        
            
        
    
    }
}
