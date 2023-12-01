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

        // Configurar el objeto objetivo
        this.target = this.add.sprite(800, 200, 'cubitera'); // Ajusta la posición y la clave según tus necesidades
        this.target.setScale(0.25);
        this.target.setRotation(Phaser.Math.DegToRad(300));
        this.physics.world.enable(this.target);

        // Se agregan físicas a la escena
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.cube.setCollideWorldBounds(true);  // Asegurar que el jugador no salga de los límites del mundo

        // Configurar eventos del ratón
        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointerup', this.onPointerUp, this);

        // Configurar colisión entre el hielo y el objetivo
        this.physics.add.collider(this.cube, this.target, this.onCollision, null, this);

        // Texto para mostrar cuando se completa la colisión
        this.completionText = this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2, 'Completado', { fontSize: '32px', fill: '#fff' });
        this.completionText.setOrigin(0.5); // Establecer el origen en el centro para centrar el texto

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

    onCollision() {
        // Verificar si el texto ya está visible para evitar repetir la lógica
        if (!this.completionText.visible) {
            // Manejar la colisión entre el hielo y el objetivo
            this.completionText.setVisible(true);
            // Puedes agregar lógica adicional aquí, como reiniciar el nivel, etc.
        }
    }
    
}
