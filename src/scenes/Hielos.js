import icecube from "./icecube.js";
let ForceX = 20,
    ForceY = 10;

export default class Hielos extends Phaser.Scene {
    constructor() {
        super({ key: 'Hielos' });
    }

    create() {
        // Configurar jugador
        this.cube = new icecube(this, 300, 300);

        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.cube.setCollideWorldBounds(true);  // Asegurar que el jugador no salga de los límites del mundo

        // Configurar eventos del ratón
        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointerup', this.onPointerUp, this);

        console.log('create Hielos');
    }

    update() {
        if (this.isDragging) {
            // Mover el cubo a la posición del ratón
            this.cube.x = this.input.x;
            this.cube.y = this.input.y;
        }
    }

    onPointerDown(pointer) {
        // Verificar si el ratón está sobre el cubo
        if (this.cube.getBounds().contains(pointer.x, pointer.y)) {
            // Iniciar el arrastre
            this.isDragging = true;
        }
    }

    onPointerUp(pointer) {
        if (this.isDragging) {
            // Detener el arrastre e impulsar el cubo
            this.isDragging = false;

            const velocityX = (pointer.x - this.cube.x) * ForceX;
            const velocityY = (pointer.y - this.cube.y) * ForceY;

            this.cube.setVelocity(velocityX, velocityY);
        }
    }
}
